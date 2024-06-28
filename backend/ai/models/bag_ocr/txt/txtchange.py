#########################
# 이승주
# library : difflib
# 2024. 6 .9 수정
# pip install fasttext-wheel
# pip install cdifflib
# difflib 오탈자 수정
##########################
import os
import difflib

def pillfix(seungju): # txt 주소 받아 오기
    #약 이름 불러오기
    current_path = os.path.dirname(os.path.abspath(__file__))
    f = open(f"{current_path}/pillname.txt","r",encoding='UTF8')
    pillName = f.readline().rstrip()
    knownName = []
    while pillName:
        knownName.append(pillName)
        pillName = f.readline().rstrip()
    f.close()

    f = open(f"{seungju}","r")
    txt = f.readline().rstrip()
    existpill = []
    while txt:
        closest_match = difflib.get_close_matches(txt, knownName, n=1, cutoff=0.82)
        if len(closest_match) != 0:
            correctName = closest_match[0]
        else:
            txt = f.readline().rstrip()
            continue
        existpill.append(correctName)
        txt = f.readline().rstrip()
    f.close()
    return existpill