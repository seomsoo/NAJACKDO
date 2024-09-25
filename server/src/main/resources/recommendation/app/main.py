import reco_sys
import quality_inspection.yolo as yolo
import os
import boto3
import uuid 
import dao
from pymongo import MongoClient
from pydantic import BaseModel  # 이 줄을 추가하세요.
from fastapi import FastAPI, File, UploadFile, Form
app = FastAPI()





s3 = boto3.client(
    "s3", aws_access_key_id="AKIA3FLDX2N75BJLGD4O", aws_secret_access_key="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"
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
async def quality_inspection( user_id: int = Form(...),
                             user_book_id: int = Form(...),
                             files: list[UploadFile] = File(...)):

    standard_price = dao.get_standard_price(user_id, user_book_id)

    print(standard_price)
    
    dao.insert_user_book_detail(user_book_id, 2, 2, "1", "2", "3", "4", standard_price)
    
    # 파일 정보를 저장할 리스트
    uploaded_files_info = []
    

    # for file in files:
    #     filename = f"{str(uuid.uuid4())}.jpg"
    #     s3_key = f"{filename}"
        
    #     s3.upload_fileobj(file.file, "najackdo", s3_key)
        
        
    #     # 업로드한 파일의 정보 추가
    #     uploaded_files_info.append({
    #         "filename": file.filename,
    #         "content_type": file.content_type
    #     })
        
        
        

    return {"uploaded_files": uploaded_files_info,
            "standard_price" : standard_price}