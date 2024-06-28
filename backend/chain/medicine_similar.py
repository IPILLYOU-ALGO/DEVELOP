######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 동일성분 의약품 검색 구현
######################################################


from drug.models import Drug as drug
from django.db.models import Q


class SimilarDrugFind:

    def __init__(self, drug_no):
        self.drug_no = drug_no


    ### 같은 성분의 약 중에서 단가가 싼 약 3개 가져오기 --------------------------

    # 입력된 약과 같은 성분의 약을 가격 내림차순으로 반환
    def materialCodefind(self):
        # 약 코드로 성분 코드 찾아오기
        queryset0 = drug.objects.filter(
            Q(drug_no__exact=self.drug_no)
        ).values("drug_material")

        materialCode = queryset0[0]["drug_material"]

        # 성분코드가 같은 약을 가져오기
        queryset1 = drug.objects.filter(
            Q(drug_material__exact=materialCode)
        ).order_by("drug_price")

        return queryset1


    # 같은 성분의 약들을 리스트에 넣는다
    def similarDrugsList(self, queryset):
        similarDrugs = []
        for item in queryset:
            # 같은 약이면 패스
            if item.drug_no == self.drug_no:
                pass
            else:
                # 동일성분 약의 데이터를 만든다.
                similarDrugs.append(
                            {
                                "drug_no": item.drug_no, 
                                "drug_price": item.drug_price,
                                "drug_name": item.drug_name,
                                "drug_classify": item.drug_classify,
                                "drug_illness": item.drug_illness,
                                "drug_img_key": item.drug_img_path
                            }
                        )

        return similarDrugs


    def run(self):

        queryset = self.materialCodefind()
        similarDrugs = self.similarDrugsList(queryset)

        return similarDrugs[:3]
