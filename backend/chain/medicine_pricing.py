######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 동일성분 의약품 검색 및 가격비교 구현
######################################################


from drug.models import Drug as drug
from django.db.models import Q


class MedicinePrice:

    # 고객id랑 약 정보가 담긴 리스틀 전역변수로 선언 
    # customerDrug 구조: [{"drug_no": , "take_no"}, {"drug_no": , "take_no"}]
    def __init__(self, customerDrug):
        self.customerDrug = customerDrug

    ### 같은 성분의 약 중에서 단가가 싼 약 3개 가져오기 --------------------------

    # 입력된 약과 같은 성분의 약을 가격 내림차순으로 반환
    def materialCodefind(self):
        # 약 코드로 성분 코드 찾아오기
        queryset0 = drug.objects.filter(
            Q(drug_no__exact=self.drugNo)
        ).values("drug_material")

        materialCode = queryset0[0]["drug_material"]

        # 성분코드가 같은 약을 가져오기
        queryset1 = drug.objects.filter(
            Q(drug_material__exact=materialCode)
        ).order_by("drug_price")

        return queryset1


    # 같은 성분의 약들을 리스트에 넣는다
    def similarDrugsList(self, queryset, takeNum):
        similarDrugs = []
        # takeNum = int(takeNum)
        for item in queryset:
            if item.drug_no == self.drugNo:
                self.customerDrugPrice = int(item.drug_price) * takeNum * 7
                # 고객이 먹는 약의 데이터를 만든다.
                self.customerDrugData = {
                    "drug_no": item.drug_no, 
                    "drug_img_key": item.drug_img_path,
                    "drug_price": self.customerDrugPrice,
                    "drug_name": item.drug_name,
                    "take_num": takeNum,
                    "drug_classify": item.drug_classify,
                    "drug_illness": item.drug_illness
                    }
            else:
                # 동일성분 약의 데이터를 만든다.
                similarDrugs.append(
                            {
                                "drug_no": item.drug_no, 
                                "drug_price": int(item.drug_price) * takeNum * 7,
                                "drug_name": item.drug_name,
                                "drug_classify": item.drug_classify
                            }
                        )

        return similarDrugs


    # 사용자가 먹는 약과 가격을 비교해서 더 싼 약을 3개까지 집어넣는다.
    def similarDataMake(self, similarDrugs):
        similarDrugData = []
        for similarDrug in similarDrugs:
            # 약값이 더 비싸지면 for문 중지
            if similarDrug["drug_price"] >= self.customerDrugPrice:
                print("가격이 더 비싸집니다.")
                break

            similarDrugData.append(similarDrug)

            # 약을 3개 찾았으면 for문 중지
            if len(similarDrugData) >= 3:
                break

        if similarDrugData:
            # 약 가격을 기존 약과의 차액으로 변경
            for drugData in similarDrugData:
                drugData["drug_price"] = self.customerDrugPrice - drugData["drug_price"]
        # else:
        #     similarDrugData.append({"drug_no": "없음", "drug_price": 0})

        return similarDrugData

    def run(self):
        similarDrugDataList = []
        for drugData in self.customerDrug:
            dic = {}
            # 약 번호를 변수로
            self.drugNo = drugData["drug_no"]

            # 고객이 먹는 개수를 변수로
            takeNum = int(drugData["take_num"].replace("개", ""))

            # 입력된 약과 같은 성분의 약을 가격 내림차순으로 반환
            queryset = self.materialCodefind()

            similarDrugs = self.similarDrugsList(queryset, takeNum)
            similarDrugData = self.similarDataMake(similarDrugs)

            dic["customer"] = self.customerDrugData
            dic["similar"] = similarDrugData

            similarDrugDataList.append(dic)

        return similarDrugDataList

