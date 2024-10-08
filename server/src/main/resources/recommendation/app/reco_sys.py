import pandas as pd
import random
import numpy as np
import faiss
from collections import OrderedDict
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from shapely import wkb


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

    most_similar_books = cosine_similarities[book_index].argsort()[::-1]

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
        # book_marks_df = book_marks_df[book_marks_df['genre'] == genre]
        rentals_df = rentals_df[rentals_df['genre'] == genre]
    
    item_user_matrix = create_item_user_matrix(visits_df, book_marks_df, rentals_df)
    item_user_matrix

    if item_user_matrix.empty:
        return []  # 매트릭스가 비어 있으면 빈 리스트 반환

    return recommend_books(item_user_matrix, bookId)

def wkb_to_lac(wkb_hex):
    wkb_bytes = bytes.fromhex(wkb_hex)

    # WKB 파싱
    point = wkb.loads(wkb_bytes)
    
    # 위도와 경도 추출
    # longitude, latitude = point.x, point.y
    return point


def calculate_fit_score(user_preferences, items, individual=None):
    # individual이 None이 아니고 정수인지 확인
    if individual is None or not isinstance(individual, int) or individual < 0 or individual >= len(items):
        return 0

    # 아이템 벡터 가져오기
    item_vector = items[individual][-1].reshape(1, -1).astype('float32')  # faiss는 float32 타입을 요구

    # 사용자 선호도를 2D 배열로 변환
    user_preferences_reshaped = user_preferences.reshape(1, -1).astype('float32')

    # faiss 인덱스 생성 (L2 거리 사용)
    index = faiss.IndexFlatL2(user_preferences_reshaped.shape[1])  # 차원 수에 맞는 인덱스 생성
    index.add(item_vector)  # 아이템 벡터 추가

    # 유사도 계산
    distances, indices = index.search(user_preferences_reshaped, 1)  # 가장 가까운 아이템 검색
    similarity = -distances[0][0]  # L2 거리의 경우, 유사도는 거리의 음수로 변환

    return similarity

def genetic_algorithm_recommendation(user_preferences, items, liked_items, population_size=5, generations=5, num_recommendations=5):

    if(population_size>len(items)):
        population_size=len(items)
        
    population = random.sample(range(len(items)), population_size)
    best_solutions = []  # 상위 아이템 저장을 위한 리스트

    for generation in range(generations):
        scores = []
        for individual in population:
            if individual not in liked_items:
                fit_score = calculate_fit_score(user_preferences, items, individual)
                scores.append((individual, fit_score))

        # 가장 높은 적합도를 가진 아이템 찾기
        scores.sort(key=lambda x: x[1], reverse=True)
        if scores:
            best_solutions.extend(scores[:num_recommendations])  # 상위 추천 아이템 추가

        # 새로운 세대 생성 (상위 50% 선택)
        population = [individual for individual, score in scores[:population_size // 2]]

        # 무작위로 새 아이템 추가
        while len(population) < population_size:
            new_item_index = random.choice(range(len(items)))
            if new_item_index not in population and new_item_index not in liked_items:
                population.append(new_item_index)

    # print("bestsolution =")
    # print(best_solutions)
    
    
    
    # 유일한 추천 아이템과 점수 반환
    # unique_recommendations = list(set(individual for individual, score in best_solutions))
    unique_recommendations = list(OrderedDict.fromkeys(individual for individual, score in best_solutions))
    
    # print("unique_recommendations =")
    # print(unique_recommendations)
    recommended_items_with_scores = [items[idx] for idx in unique_recommendations[:num_recommendations]]

    return recommended_items_with_scores  # [(아이템 인덱스, 유사도 점수)]