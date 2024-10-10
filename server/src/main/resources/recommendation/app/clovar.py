import requests
import uuid
import time
import json
from PIL import Image
import requests
import io
import os
from dotenv import load_dotenv



load_dotenv() 


api_url = os.getenv('API_URL')
secret_key = os.getenv('SECRET_KEY')

print(api_url)
print(secret_key)

request_json = {
    'images': [
        {
            'format': 'jpg',
            'name': 'demo'
        }
    ],
    'requestId': str(uuid.uuid4()),
    'version': 'V2',
    'timestamp': int(round(time.time() * 1000))
}

payload = {'message': json.dumps(request_json).encode('UTF-8')}

headers = {
    'X-OCR-SECRET': secret_key
    }

def clovar_ocr(image_file):
    img_byte_array = io.BytesIO()
    image_file.save(img_byte_array, format='JPEG')  # 또는 필요한 포맷으로 변경
    img_byte_array.seek(0)  # 바이트 스트림의 시작으로 이동

    files = [
        ('file', ('image_file.jpg', img_byte_array, 'image/jpeg'))  # 파일 이름과 MIME 타입 포함
    ]
    
    
    response = requests.request("POST", api_url, headers=headers, data = payload, files = files)
    print(response)
    titles=[]
    # 원래 코드는 print(response.text.encode('utf8'))이지만 수정
    for i in response.json()['images'][0]['fields']:
        text = i['inferText']
        titles.append(text) 
    print(titles)
    return titles



