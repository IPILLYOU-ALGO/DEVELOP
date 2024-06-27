import os
import cv2
from rembg import remove

def crop_and_save_objects(source_image_path, label_file_path, output_dir):
    """
    객체 감지 결과를 기반으로 이미지를 분할하고 배경을 제거하여 저장합니다.
    """
    image = cv2.imread(source_image_path)
    with open(label_file_path, 'r') as f:
        lines = f.readlines()

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)


    for i, line in enumerate(lines):
        class_id, x_center, y_center, width, height = map(float, line.strip().split())
        image_height, image_width = image.shape[:2]
        x1 = int((x_center - width / 2) * image_width)
        y1 = int((y_center - height / 2) * image_height)
        x2 = int((x_center + width / 2) * image_width)
        y2 = int((y_center + height / 2) * image_height)
        cropped_image = image[y1:y2, x1:x2]

        cropped_image_no_bg = remove(cropped_image)
        class_name = "class_" + str(int(class_id))
        output_filename = f"{class_name}_{i+1}.png"
        output_path = os.path.join(output_dir, output_filename)

        cv2.imwrite(output_path, cropped_image_no_bg)
