import reco_sys
import quality_inspection.yolo as yolo
import os
import boto3
import uuid 
import dao
import cv2
import io
import csvocr
import numpy as np
import book_spine_detection
import struct
import time
import clovar
from shapely import wkb
from sentence_transformers import SentenceTransformer
from rapidfuzz import fuzz
from ultralytics import YOLO
from pymongo import MongoClient
from pydantic import BaseModel  
from fastapi import FastAPI, File, UploadFile, Form, Query
from dotenv import load_dotenv
from PIL import Image, ExifTags
from math import log10
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta 
from rapidfuzz import process, fuzz 

load_dotenv() 
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "quality_inspection/best.pt")
spine_model_path = os.path.join(script_dir, "book_spine_detection/best.pt")
yolo_model = YOLO(model_path)
spine_model = YOLO(spine_model_path)
ocr_reader = easyocr.Reader(['ko','en'])

aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

s3 = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

model = SentenceTransformer('all-MiniLM-L6-v2')

client = MongoClient("mongodb://najackdo:najackdo@mongodb:27017/najackdo?authSource=admin", maxPoolSize=30, minPoolSize=5)
# client = MongoClient("mongodb://najackdo:najackdo@www.najackdo.kro.kr:27017/najackdo?authSource=admin", maxPoolSize=30, minPoolSize=5)

db = client.najackdo

class QualityInspectionRequest(BaseModel):
    user_id: int
    user_book_id: int

@app.get("/item/recomm")
async def recomm_books(bookId: int = Query(...), genre: str = Query(...)):
    
    result = reco_sys.recomm_book_list(bookId, db, genre)
    
    return {"bookIds": result}  



@app.post("/python/item/quality-inspection")
async def quality_inspection(user_id: int = Form(...),
                             user_book_id: int = Form(...),
                             files: list[UploadFile] = File(...)):

    uploaded_files_info = []
    images = []

    for file in files:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        images.append(image)

        # S3에 업로드
        file_extension = file.filename.split('.')[-1]  # 확장자 추출
        filename = f"{str(uuid.uuid4())}.{file_extension}"  # UUID와 확장자를 결합
        
        # ContentType 설정
        content_type = file.content_type

        # 새로운 BytesIO 객체를 사용하여 파일 데이터 스트림을 생성
        file_data_stream = io.BytesIO(image_data)
        file_data_stream.seek(0)  # 스트림의 시작으로 이동

        # S3에 업로드
        s3.upload_fileobj(file_data_stream, "najackdo", filename, ExtraArgs={"ContentType": content_type})

        # 업로드한 파일의 정보 추가
        uploaded_files_info.append({
            "filename": filename,
            "content_type": content_type
        })

    count_ripped = 0
    count_wornout = 0
    
    # YOLO 모델로 예측 수행
    results = yolo_model(images)

    # 주석이 달린 이미지 S3에 업로드
    for i, result in enumerate(results):
        boxes = result.boxes.data
        outputs = np.array(boxes)
        last_index = outputs.shape[1] - 1
        for output in outputs:
            if output[last_index] == 1.0:
                count_ripped += 1
            else:
                count_wornout += 1
        
        # 박스가 그려진 이미지를 가져옵니다.
        annotated_image = result.plot()  # 감지된 객체가 표시된 이미지 (numpy.ndarray 형식)

        # numpy.ndarray를 PIL.Image로 변환
        annotated_image_pil = Image.fromarray(np.uint8(annotated_image))

        # 박스가 그려진 이미지를 BytesIO로 변환
        img_byte_array = io.BytesIO()
        annotated_image_pil.save(img_byte_array, format='JPEG')
        img_byte_array.seek(0)

        # S3에 업로드
        annotated_filename = f"{str(uuid.uuid4())}.jpeg"
        
        s3.upload_fileobj(img_byte_array, "najackdo", annotated_filename, ExtraArgs={"ContentType": "image/jpeg"})

        # 업로드한 파일의 정보 추가
        uploaded_files_info.append({
            "filename": annotated_filename,
            "content_type": "image/jpeg"
        })

    book = dao.get_book(user_id, user_book_id)
    
    dao.insert_user_book_detail(user_book_id, count_ripped, count_wornout, 
                                "https://d16os79fbmszq4.cloudfront.net/" + uploaded_files_info[1]["filename"],
                                "https://d16os79fbmszq4.cloudfront.net/" + uploaded_files_info[0]["filename"],
                                "https://d16os79fbmszq4.cloudfront.net/" + uploaded_files_info[2]["filename"],
                                "https://d16os79fbmszq4.cloudfront.net/" + uploaded_files_info[3]["filename"],
                                book["price_standard"])

    return {
        "uploaded_files": uploaded_files_info,
        "book": book,
        "one_day_price": book["price_standard"] * (2 - log10(10 + 2 * min((count_ripped + count_wornout), 30))) / 100,
        "count_ripped": count_ripped,
        "count_wornout": count_wornout
    }

@app.post("/item/bookSpineDetection")
async def quality_inspection(imageFile: UploadFile = File(...)):
    
    
    # 책 리스트를 캐시 파일에서 가져옴

    book_list = book_spine_detection.get_book_from_csv()

    # 캐시 파일과 db의 책 갯수 비교 후, 업데이트
    if not dao.need_to_getBook(len(book_list)):
        book_list = dao.get_book_data()
        file_path = 'titles.csv'

        with open(file_path, mode='w', encoding='utf-8', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(['Title'])  # 헤더 작성
            csv_writer.writerows([[book] for book in book_list])  # 모든 제목을 한 번에 추가

    image_data = await imageFile.read()
    bw_img = Image.open(io.BytesIO(image_data)).convert("L")
    
    
    book_list = [book[0] for book in book_list]
    # EXIF 데이터에서 Orientation 값 얻기
    exif = bw_img.getexif()
    orientation = exif.get(0x0112) if exif is not None else None  # 'Orientation'의 TAG 번호는 0x0112
    orientation_map = {3: 180, 6: 270, 8: 90}
    if orientation in orientation_map:
        bw_img = bw_img.rotate(orientation_map[orientation], expand=True)

    title_list2 = []
    rotate_image = bw_img.rotate(90, expand=1)  # 90도 회전

    titles = (rotate_image)
    
    # titles = ocr_reader.readtext(np.array(rotate_image))
    
    result = spine_model(bw_img,device="cpu")
    output = np.array(result[0].boxes.data)
    
    for idx, book in enumerate(output):
        crop_image = bw_img.crop((book[0],book[1],book[2],book[3]))
        rotate_image = crop_image.rotate(90, expand=1)  
        titles = clovar.clovar_ocr(rotate_image)
        if titles:
            for title in titles:
                if(len(title)<=4):
                    continue
                # matches = process.extract(title, book_list, limit=None, scorer=fuzz.ratio)
                # for match in matches:
                #     book_title, score, _ = match
                #     print("book_title:" + book_title + "score: "+ str(score)+"원본 : "+title)
                #     if score >= 60:  # 유사도 기준
                #         title_list2.append(book_title)
                for bookTitle in book_list:
                    if(len(bookTitle)<6):
                        continue
                    Qratio = fuzz.ratio(bookTitle,title)

                    if(Qratio>=30):
                        title_list2.append(bookTitle)
                    
    # print(np.shape(book_list))
    # print(titles)
    # if titles:
    #     recognized_titles = [title[1] for title in titles if len(title) > 4]

    #     # rapidfuzz로 가장 가까운 책 제목 찾기
        # for recognized_title in recognized_titles:
        #     matches = process.extract(recognized_title, book_list, limit=None, scorer=fuzz.ratio)
        #     for match in matches:
        #         book_title, score, _ = match
        #         if score >= 60:  # 유사도 기준
        #             title_list2.append(book_title)
    return {"titles": list(set(title_list2))}

@app.get("/python/item/userrecommand/{userId}")
async def recomm_books(userId : int):
    data = dao.get_user_books_data()

    if not data:
        print("db 정보 없음")
        return

    items = [
        [
            row['user_book_id'],
            reco_sys.wkb_to_lac(row['location_point']),
            row['pub_date'],
            row['genre'],
            row['used_price'],
            row['wornout'],
            np.array(model.encode(row['description']))
        ]
            for row in data
    ]
    
    today = datetime.now()
    one_week_ago = today - timedelta(days=7)

    book_marks = list(db["book_mark"].find({"userId": userId},{"bookId":1,"_id":0}))

    rental_list = list(db["rental"].find({"userId":userId,
        "createdAt": {
            "$gte": one_week_ago,  # 일주일 전
            "$lte": today          # 오늘
        }},{"bookId":1,"_id":0}))

    merged_list = {item['bookId']: item for item in book_marks + rental_list}

    # 리스트로 변환
    book_ids = [book["bookId"] for book in list(merged_list.values())]
    
    if not book_ids:
        print("유저 정보 없음")
        return {"recommended_items_with_scores": dao.get_book_order_by_star()}
    
    user_like_books = dao.fetch_books(book_ids)
    
        
    user_like_books_list = [
        [
            np.array(model.encode(row['description']))
        ]
        for row in user_like_books
    ]
    
    combined_array = np.array([arr[0] for arr in user_like_books_list])

    user_preferences = np.mean(combined_array, axis=0)
    
    recommended_items_with_scores = reco_sys.genetic_algorithm_recommendation(user_preferences, items, book_ids, num_recommendations=5)
    idx_list = [item[0] for item in recommended_items_with_scores]
    cover_list = dao.get_book_cover(idx_list)
    recommended_items_with_scores2 = [
    {
        "book_id": cover['book_id'],
        "cover": cover['cover']        # cover는 두 번째 요소
    }
        for cover in cover_list
    ]   
    return {"recommended_items_with_scores": recommended_items_with_scores2}  


@app.get("/python/item/userrecommandbygenre")
async def recomm_books(userId: int = Query(...), category: str = Query(...)):
    data = dao.get_user_books_data_by_genre(category)

    if not data:
        print("db 정보 없음")
        return
    
    items = [
    [
        row['book_id'],
        [],
        row['pub_date'],
        row['genre'],
        row['price_standard'],
        [],
        np.array(model.encode(row['description']))
    ]
        for row in data
    ]
    
    today = datetime.now()
    one_week_ago = today - timedelta(days=7)

    book_marks = list(db["book_mark"].find({"userId": userId},{"bookId":1,"_id":0}))

    rental_list = list(db["rental"].find({"userId":userId,
        "createdAt": {
            "$gte": one_week_ago,  # 일주일 전
            "$lte": today          # 오늘
        }},{"bookId":1,"_id":0}))

    merged_list = {item['bookId']: item for item in book_marks + rental_list}



    # 리스트로 변환
    book_ids = [book["bookId"] for book in list(merged_list.values())]
    
    if not book_ids:
        print("들어옴")
        return {"recommended_items_with_scores": dao.get_book_order_by_star()}
    
    user_like_books = dao.fetch_books(book_ids)
    
     
        
    user_like_books_list = [
        [
            np.array(model.encode(row['description']))
        ]
        for row in user_like_books
    ]
    
    combined_array = np.array([arr[0] for arr in user_like_books_list])

    user_preferences = np.mean(combined_array, axis=0)
    
    recommended_items_with_scores = reco_sys.genetic_algorithm_recommendation(user_preferences, items, book_ids, num_recommendations=5)
    
    idx_list = [item[0] for item in recommended_items_with_scores]
    print(idx_list)
    cover_list = dao.get_book_cover_for_genre(idx_list)
    print(cover_list)
    image_links = [row['cover'] for row in cover_list]
    # print(recommended_items_with_scores)
    print(image_links)
    combined_list = [(recommended_items_with_scores[i], image_links[i]) for i in range(len(recommended_items_with_scores))]
    
    recommended_items_with_scores2 = [
    {
        "book_id": item[0][0],
        "fitness": item[0][1], # book_id는 첫 번째 리스트의 첫 번째 요소
        "cover": item[1]        # cover는 두 번째 요소
    }
        for item in combined_list
    ]   
    return {"recommended_items_with_scores": recommended_items_with_scores2}  