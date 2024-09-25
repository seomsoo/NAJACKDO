from fastapi import FastAPI
import reco_sys
from pymongo import MongoClient

app = FastAPI()
client = MongoClient("mongodb://najackdo:najackdo@mongodb:27017/najackdo?authSource=admin", maxPoolSize=30, minPoolSize=5)

db = client.najackdo



@app.get("/item/recomm/{bookId}")
async def recomm_books(bookId : int):
    result = reco_sys.recomm_book_list(bookId, db, None)
    
    return {"bookIds": result}  