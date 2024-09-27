import reco_sys
import quality_inspection.yolo as yolo
import os
import boto3
import uuid 
import dao
import cv2
import io
import numpy as np
from ultralytics import YOLO
from pymongo import MongoClient
from pydantic import BaseModel  
from fastapi import FastAPI, File, UploadFile, Form
from dotenv import load_dotenv
from PIL import Image 
from math import log10


load_dotenv() 
app = FastAPI()

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "quality_inspection/best.pt")
model = YOLO(model_path)


aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

s3 = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)


client = MongoClient("mongodb://najackdo:najackdo@mongodb:27017/najackdo?authSource=admin", maxPoolSize=30, minPoolSize=5)


db = client.najackdo

class QualityInspectionRequest(BaseModel):
    user_id: int
    user_book_id: int


@app.get("/item/recomm/{bookId}")
async def recomm_books(bookId : int):
    
    result = reco_sys.recomm_book_list(bookId, db, None)
    
    return {"bookIds": result}  



@app.post("/item/quality-inspection")
async def quality_inspection(user_id: int = Form(...),
                             user_book_id: int = Form(...),
                             files: list[UploadFile] = File(...)):

    uploaded_files_info = []
    images = []
    file_data_streams = []  # 원본 파일 스트림 저장

    for file in files:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        images.append(image)
        file_data_streams.append(io.BytesIO(image_data))  # 파일 데이터 저장

    # YOLO 모델로 예측 수행
    results = model(images)

    # 원본 파일 S3에 업로드
    for i, file in enumerate(files):
        file_extension = file.filename.split('.')[-1]  # 확장자 추출
        filename = f"{str(uuid.uuid4())}.{file_extension}"  # UUID와 확장자를 결합

        # ContentType 설정
        content_type = file.content_type
        
        # S3에 업로드
        s3.upload_fileobj(file_data_streams[i], "najackdo", filename, ExtraArgs={"ContentType": content_type})

        # 업로드한 파일의 정보 추가
        uploaded_files_info.append({
            "filename": filename,
            "content_type": content_type
        })

    count_ripped = 0
    count_wornout = 0
    
    # 주석이 달린 이미지 S3에 업로드
    for i, result in enumerate(results):
        boxes = result.boxes.data
        outputs = np.array(boxes)
        last_index = outputs.shape[1]-1
        for output in outputs:
            if(output[last_index]==1.0):
                count_ripped+=1
            else:
                count_wornout+=1
        
        
        # 박스가 그려진 이미지를 가져옵니다.
        annotated_image = result.plot()  # 감지된 객체가 표시된 이미지 (numpy.ndarray 형식)

        # numpy.ndarray를 PIL.Image로 변환
        annotated_image_pil = Image.fromarray(np.uint8(annotated_image))

        # 박스가 그려진 이미지를 BytesIO로 변환
        img_byte_array = io.BytesIO()
        annotated_image_pil.save(img_byte_array, format='JPEG')
        img_byte_array.seek(0)

        # S3에 업로드
        filename = f"{str(uuid.uuid4())}.jpeg"
        
        s3.upload_fileobj(img_byte_array, "najackdo", filename, ExtraArgs={"ContentType": "image/jpeg"})

        # 업로드한 파일의 정보 추가
        uploaded_files_info.append({
            "filename": filename,
            "content_type": "image/jpeg"
        })
    
    
    book = dao.get_book(user_id, user_book_id)
    
    dao.insert_user_book_detail(user_book_id, count_ripped, count_wornout, 
                                uploaded_files_info[0]["filename"],
                                uploaded_files_info[1]["filename"],
                                uploaded_files_info[2]["filename"],
                                uploaded_files_info[3]["filename"],
                                book["price_standard"]* (2 - log10(10 + 2 * min((count_ripped + count_wornout), 30)  )) / 100)

    return {"uploaded_files": uploaded_files_info,
            "book": book,
            "one_day_price": book["price_standard"]* (2 - log10(10 + 2 * min((count_ripped + count_wornout), 30)  )) / 100,
            "count_ripped" :count_ripped,
            "count_wornout": count_wornout}