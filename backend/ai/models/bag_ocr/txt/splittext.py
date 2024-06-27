#########################
# 이승주
# library : re
# 2024. 6 .9 수정
##########################
import re

def splittext(txt):
    f= open(txt,"r")
    a = f.readline()
    readList = []
    while a:
        s = a.split()
        for i in s:
            i = re.sub(r"[^\uAC00-\uD7A3]", "", i)
            #new_str = re.sub(r"[^\uAC00-\uD7A30-9a-zA-Z\s]", "", str)
            if i == "":
                continue
            readList.append(i)
        a = f.readline()
        if len(s) == 0:
            continue  
    newF= open(f"{txt}","w")
    for i in readList:
        newF.write(i+"\n")
    newF.close()
    f.close()