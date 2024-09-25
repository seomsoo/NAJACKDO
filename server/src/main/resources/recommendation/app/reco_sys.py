import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity



def create_item_user_matrix(visits_df, book_marks_df, rentals_df):
    time_spent_weight = 0.5
    favorite_weight = 0.3
    like_weight = 0.2
    
    if visits_df.empty and book_marks_df.empty and rentals_df.empty:
        return pd.DataFrame()

    book_ids = pd.concat([visits_df['bookId'], book_marks_df['bookId'], rentals_df['bookId']]).unique()
    user_ids = pd.concat([visits_df['userId'], book_marks_df['userId'], rentals_df['userId']]).unique()

    item_user_matrix = pd.DataFrame(0.0, index=book_ids, columns=user_ids)
    

    # (3)
    for idx, row in visits_df.iterrows():
        item_user_matrix.loc[row['bookId'], row['userId']] += row['timeSpent'] / visits_df['timeSpent'].max() * time_spent_weight

    for idx, row in book_marks_df.iterrows():
        
        item_user_matrix.loc[row['bookId'], row['userId']] += 1 * favorite_weight

    for idx, row in rentals_df.iterrows():
        item_user_matrix.loc[row['bookId'], row['userId']] += 1 * like_weight

    
    return item_user_matrix


def recommend_books(item_user_matrix, bookId):
    if bookId not in item_user_matrix.index:
        return []  # bookId가 매트릭스에 없으면 빈 리스트 반환


    cosine_similarities = cosine_similarity(item_user_matrix)
    book_index = item_user_matrix.index.get_loc(bookId)

    most_similar_books = cosine_similarities[book_index].argsort()[:-15:-1]

    recommended_books = item_user_matrix.iloc[most_similar_books].index.tolist()

    return recommended_books


def recomm_book_list(bookId, db, genre = ""):
    

    visits = list(db["visit"].find({}))
    book_marks = list(db["book_mark"].find({}))
    rentals = list(db["rental"].find({}))
    
    visits_df = pd.DataFrame(visits)
    book_marks_df = pd.DataFrame(book_marks)
    rentals_df = pd.DataFrame(rentals)

    if (genre):
        visits_df = visits_df[visits_df['genre'] == genre]
        book_marks_df = book_marks_df[book_marks_df['genre'] == genre]
        rentals_df = rentals_df[rentals_df['genre'] == genre]
    
    item_user_matrix = create_item_user_matrix(visits_df, book_marks_df, rentals_df)
    item_user_matrix

    if item_user_matrix.empty:
        return []  # 매트릭스가 비어 있으면 빈 리스트 반환

    return recommend_books(item_user_matrix, bookId)