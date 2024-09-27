import psycopg2
from math import log10

# PostgreSQL 데이터베이스에 연결
connection = psycopg2.connect(
    dbname="najackdo",
    user="najackdo",
    password="najackdo",
    host="localhost",
    port="5432"
)



def get_standard_price(user_id, user_book_id):
    
    standard_price = -1
    
    try:
        with connection.cursor() as cursor:
            query = f"""
            SELECT b.price_standard FROM books as b
            JOIN user_book as ub on b.book_id = ub.book_id
            WHERE ub.book_id = {user_book_id} and ub.user_id = {user_id};
            
            """
            
            cursor.execute(query) 

            row = cursor.fetchone()
            
            standard_price = row[0]

    except Exception as e:
        print(f"오류 발생: {e}")

    return standard_price



def insert_user_book_detail(
    user_book_id, 
    ripped, 
    worn_out, 
    front_book_image_url, 
    back_book_image_url, 
    inspect_front_book_image_url, 
    inspect_back_book_image_url,
    standard_price
):
    
    
    
    one_day_price = standard_price * (2 - log10(10 + 2 * min((worn_out + ripped), 30)  )) / 100
    
    try:
        with connection.cursor() as cursor:
            
            
            
            query = """
            INSERT INTO user_book_details (
                user_books_id, 
                ripped, 
                wornout, 
                back_image_path, 
                front_image_path,
                inspect_front_image_path,
                inspect_back_image_path,
                oneday_price,
                used_price
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"""

            cursor.execute(query, (
                user_book_id, 
                ripped, 
                worn_out, 
                front_book_image_url, 
                back_book_image_url, 
                inspect_front_book_image_url,
                inspect_back_book_image_url,
                one_day_price,
                one_day_price * 100
            ))

            connection.commit()

    except Exception as e:
        print(f"오류 발생: {e}")
        connection.rollback()
        
def need_to_getBook(local_book_count):
    
    try:
        with connection.cursor() as cursor:
            query = """
            SELECT count(*) FROM books;
            """
            
            cursor.execute(query) 

            db_book_count = cursor.fetchone()

    except Exception as e:
        print(f"오류 발생: {e}")

    return True if local_book_count == db_book_count[0] else False

def get_book_data():
    
    try:
        with connection.cursor() as cursor:
            query = """
            SELECT b.title FROM books as b;
            """
            
            cursor.execute(query) 

            list = cursor.fetchall()

    except Exception as e:
        print(f"오류 발생: {e}")

    return list