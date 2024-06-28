######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 의약품 상호작용 랭체인 구현
######################################################


from .langchain_db import langchain_chat
from drug.models import Drug as drug
from django.db.models import Q


class MutulaLangchain:

    def __init__(self, medicineList):
        self.medicineList = medicineList

    # 랭체인에 약이름 2개를 전달하여 답변을 받아온다
    def langchainDataAdd(self):
        sendData = []

        # 약을 2개씩 짝지어 놓은 리스트를 전역변수로 사용
        for pair in self.medicinePairs:

            # 랭체인용 질문
            msg = f"{pair[0]}과 {pair[1]}의 상호작용에 대해서 알려줘."

            # 질문 전달해서 랭체인에서 답변을 받아온다
            output = langchain_chat.openai_chat_ai(msg)

            # 상호작용이 없는 경우는 빼고 sendData에 저장
            if ("상호작용이 없" not in output) and ("상호작용은 없" not in output) :
                sendData.append(
                    {
                        "drug_name_1": pair[0],
                        "drug_name_2": pair[1],
                        "output": output
                    }
                )

        self.langchainData = sendData


    # 받아온 데이터에 약 이미지와 약 성분을 추가
    def dataAdd(self):

        for data in self.langchainData:
            drug1 = data["drug_name_1"]
            drug2 = data["drug_name_2"]

            queryset1 = drug.objects.filter(
                Q(drug_name__exact=drug1)
            ).values("drug_material", "drug_img_key")

            data["drug_material_1"] = queryset1[0]["drug_material"]
            data["drug_img_key_1"] = queryset1[0]["drug_img_key"]

            queryset2 = drug.objects.filter(
                Q(drug_name__exact=drug2)
            ).values("drug_material", "drug_img_key")

            data["drug_material_2"] = queryset2[0]["drug_material"]
            data["drug_img_key_2"] = queryset2[0]["drug_img_key"]


    def run(self):
        
        # 입력된 약 이름을 2개씩 짝지어준다.
        self.medicinePairs = [(x, y) for x in self.medicineList for y in self.medicineList if x < y]
        # 랭체인에 상호작용을 질문하여 저장
        self.langchainDataAdd()
        # 저장된 데이터에 약 이미지와 약 성분을 추가
        self.dataAdd()
        
        return self.langchainData
