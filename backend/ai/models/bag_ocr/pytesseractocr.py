#########################
# 이승주
# library : cv2, pytesseract
# 2024. 6 .9 수정
# pip install pillow
# pip install opencv
# re, difflib 전처리 후 ocr 구현
##########################
import os
import cv2
import pytesseract
from .txt.splittext import splittext
from .txt.txtchange import pillfix
import time
start = time.time()

pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

def read_bag(imgName, img_path):
    block_size = 9 # thresholding 이진화를 적용할 픽셀 사이즈로 보인다. 홀수로 지정할 것
    C = 5 #계산된 경계 mean or gausian 에서 차감할 값 즉, 이진화시 경계-C에 해당하는 값은 모두 0으로
    imgs = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.fastNlMeansDenoising(imgs,None,10,7,21)
    img = cv2.adaptiveThreshold(img,255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, block_size, C)
    #img = cv2.adaptiveThreshold(img,255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, block_size, C)
    img = cv2.fastNlMeansDenoising(img,None,10,7,21)
    config = ("-l kor --oem 3 --psm 6")
    rst = pytesseract.image_to_string(
        img,
        # lang="kor",
        config = config
        )
    t1 = time.time()
    print(f"{t1-start:.4f} sec")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    dirtxt = f"{current_dir}/txt/tesseractTest{imgName}.txt"

    file = open(f"{dirtxt}","w")
    file.write(rst)
    file.close()

    splittext(dirtxt)
    t2 = time.time()
    print(f"{t2-t1:.4f} sec")
    pillName = pillfix(dirtxt)
    t3 = time.time()
    print(f"{t3-t2:.4f} sec")
    return pillName
