import os
from ultralytics import YOLO

def detect_pills(yolo_model_path, source_image_path, save_project_path):
    yolo_model = YOLO(yolo_model_path)

    image_name = os.path.splitext(os.path.basename(source_image_path))[0]

    results = yolo_model.predict(
        source=source_image_path,
        show=True,
        save=True,
        save_txt=True,
        project=save_project_path,
        name=image_name
    )

    return results, image_name
