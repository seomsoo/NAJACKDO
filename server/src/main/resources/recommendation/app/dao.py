import psycopg2
from psycopg2.extras import RealDictCursor
from math import log10

# PostgreSQL 데이터베이스에 연결
connection = psycopg2.connect(
    dbname="najackdo",
    user="najackdo",
    password="najackdo",
    # host="localhost",
    host="najackdo-database",
    port="5432"
)



def get_book(user_id, user_book_id):
    
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""
            SELECT b.title, b.publisher, b.genre, b.author, b.isbn, b.book_id, b.star_point, b.price_standard
            FROM books as b
            JOIN user_book as ub on b.book_id = ub.book_id
            WHERE ub.user_book_id = {user_book_id} and ub.user_id = {user_id};
            """
            
            cursor.execute(query) 

            row = cursor.fetchone()
            
            print(row)

    except Exception as e:
        print(f"오류 발생: {e}")

    return row



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


            query = f"""
            UPDATE user_book 
            SET book_status = 'AVAILABLE'
            where book_id = (SELECT book_id FROM user_book WHERE user_book_id = {user_book_id});
            """

            cursor.execute(query)

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