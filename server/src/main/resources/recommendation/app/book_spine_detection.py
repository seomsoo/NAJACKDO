import os
import csv

def get_book_from_csv():
    # CSV 파일 경로
    file_path = 'titles.csv'
    if os.path.isfile(file_path):
        # 리스트를 저장할 변수
        book_list = []
        
        # CSV 파일 읽기
        with open(file_path, mode='r', encoding='utf-8') as file:
            
            csv_reader = csv.reader(file_path)
            # 헤더를 건너뛰기 (필요한 경우)
            next(csv_reader)
            
            # 데이터를 리스트에 추가
            for row in csv_reader:
                book_list.append(row[0]) 
    else:
        book_list=[]
    return book_list