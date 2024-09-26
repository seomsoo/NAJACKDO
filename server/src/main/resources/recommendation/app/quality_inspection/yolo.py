from ultralytics import YOLO
import os 

script_dir = os.path.dirname(os.path.abspath(__file__))


# # 상대 경로로 파일 경로 설정
# model_path = os.path.join(script_dir, "best.pt")
# image_paths = [os.path.join(script_dir, "image5.jpg"), os.path.join(script_dir, "image6.jpg")]

# # 모델 불러오기
# model = YOLO(model_path)

# # 이미지 결과 생성
# results = model(image_paths)

# # 결과 저장
# for idx, result in enumerate(results):
#     result.save(filename=os.path.join(script_dir, f"result{idx}.jpg"))