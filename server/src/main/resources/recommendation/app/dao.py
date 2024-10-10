import psycopg2
from psycopg2.extras import RealDictCursor
from math import log10
# PostgreSQL 데이터베이스에 연결
connection = psycopg2.connect(
    dbname="najackdo",
    user="najackdo",
    password="najackdo",
    host="j11c105.p.ssafy.io",
    # host="najackdo-database",
    port="5432"
)



def get_book(user_id, user_book_id):
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""
            SELECT b.title, b.publisher, b.genre, b.author, b.isbn, b.book_id, b.star_point, b.price_standard
            FROM books as b
            JOIN user_book as ub on b.book_id = ub.book_id
            WHERE ub.user_book_id = %s AND ub.user_id = %s;
            """
            cursor.execute(query, (user_book_id, user_id))
            row = cursor.fetchone()

            if row:
                print(row)
            else:
                print("No book found for given user_book_id and user_id")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환



def insert_user_book_detail(
    user_book_id, 
    ripped, 
    worn_out, 
    front_book_image_url, 
    back_book_image_url, 
    inspect_front_book_image_url, 
    inspect_back_book_image_url,
    standard_price):
    
    
    
    one_day_price = standard_price * (2 - log10(10 + 2 * min((worn_out + ripped), 30)  )) / 100
    
    try:
        with connection.cursor() as cursor:
            

            query = """
            INSERT INTO user_book_details (
                book_detail_id,
                user_books_id,
                ripped, 
                wornout, 
                back_image_path, 
                front_image_path,
                inspect_front_image_path,
                inspect_back_image_path,
                oneday_price,
                used_price
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"""

            cursor.execute(query, (
                user_book_id,
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
            SELECT count(*) FROM test_books; 
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
            SELECT b.title FROM test_books as b;
            """
            
            cursor.execute(query) 

            list = cursor.fetchall()

    except Exception as e:
        print(f"오류 발생: {e}")

    return list

def get_user_books_data():
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""
            SELECT ub.user_book_id, ubd.used_price, l.location_point,b.description,b.genre, ubd.wornout, b.pub_date
            FROM user_book as ub
            JOIN books as b on ub.book_id = b.book_id
            JOIN location as l on ub.location_code = l.location_code
            JOIN user_book_details as ubd on ub.user_book_id = ubd.user_books_id
            WHERE ub.book_damage_checked = false
            """
            cursor.execute(query)
            row = cursor.fetchall()

            if row:
                pass
                # print(row)
            else:
                print("No user books data found")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환
    
def get_user_books_data_by_genre(genre):
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""
            WITH random_books AS (
                SELECT b.book_id
                FROM books AS b
                WHERE b.genre = %s
                ORDER BY RANDOM()
                LIMIT 50
            )
            SELECT b.book_id, b.price_standard, b.description, b.genre, b.pub_date
            FROM books AS b
            JOIN random_books AS rb ON b.book_id = rb.book_id;
            """
            cursor.execute(query, (genre,))
            row = cursor.fetchall()

            if row:
                return row  # 데이터를 반환
            else:
                print("No user books data found")
                return None  # 데이터가 없을 경우 None 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환
    
def fetch_books(book_ids):
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"SELECT b.description FROM books as b WHERE book_id IN ({','.join(map(str, book_ids))});"
            cursor.execute(query)
            row = cursor.fetchall()

            if row:
                pass
                # print(row)
            else:
                print("No user books data found")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환
    
def get_book_cover(book_ids):
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""SELECT b.book_id , b.cover 
            FROM user_book as ub
            JOIN books as b on ub.book_id = b.book_id
            WHERE ub.user_book_id IN ({','.join(map(str, book_ids))})
            ORDER BY ARRAY_POSITION(ARRAY[{','.join(map(str, book_ids))}], ub.user_book_id)
            """
            cursor.execute(query)
            row = cursor.fetchall()

            if row:
                pass
                # print(row)
            else:
                print("No user books data found")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환
    
def get_book_order_by_star():
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""SELECT b.book_id , b.cover
            FROM books as b 
            ORDER BY b.star_point
            LIMIT 5
            ;"""
            cursor.execute(query)
            row = cursor.fetchall()

            if row:
                pass
                # print(row)
            else:
                print("No user books data found")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환
    
def get_book_cover_for_genre(book_ids):
    try:
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            query = f"""
            SELECT b.cover 
            FROM books as b
            WHERE b.book_id IN ({','.join(map(str, book_ids))})
            ORDER BY ARRAY_POSITION(ARRAY[{','.join(map(str, book_ids))}], b.book_id);
            """
            cursor.execute(query)
            row = cursor.fetchall()

            if row:
                pass
                print(row)
            else:
                print("No user books data found")
            return row  # 데이터를 반환

    except Exception as e:
        print(f"오류 발생: {e}")
        return None  # 예외 발생 시 None을 반환