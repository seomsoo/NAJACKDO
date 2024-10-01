#-*- coding:utf-8 -*-
import psycopg2

# 데이터베이스 연결 정보
connection = psycopg2.connect(
    dbname="najackdo",
    user="najackdo",
    password="najackdo",
    # host="localhost",
    host="j11c105.p.ssafy.io",
    port="5432"
)

try:
    with connection.cursor() as cursor:
        query = """
        SELECT b.title FROM books as b;
        """
        cursor.execute(query) 
        titles = cursor.fetchall()

except Exception as e:
    print(f"오류 발생: {e}")


# 파일에 제목 저장
with open("titles.txt", "w", encoding="utf-8") as f:
    for title in titles:
        # title 튜플이므로 첫 번째 요소를 가져옴
        f.write(f"{title[0]}\n")

print("책 제목이 titles.txt 파일에 저장되었습니다.")