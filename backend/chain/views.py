from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from drug.models import Drug as drug
from .medicine_pricing import MedicinePrice
from .medicine_similar import SimilarDrugFind
from .medicine_langchain import MutulaLangchain
from .medicine_illnesLangchain import IllnessLangchain
import json

# Create your views here.

def index(request):
    msg = "인덱스 페이지"
    return HttpResponse(msg)



######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 의약품 상호작용 및 가격비교 페이지 구현
######################################################

@csrf_exempt
def aianalyzeresult(request):
    if request.method == "POST":
        # 클라이언트에서 전송한 JSON 데이터 받아오기
        data = json.loads(request.body)
        print(data)

        customer_drug = data["params"]['customer_drugs']

        # 약품정보가 없으면 404
        if not customer_drug:
            return JsonResponse({"message": "약품정보가 없습니다."}, status=404)
        
        # 넘어온 파라미터 값에서 약 번호 추출해서 리스트로
        drugList = []
        for item in data["params"]['customer_drugs']:
            drugList.append(item['drug_no'])

        # 약 번호로 약 이름을 검색하여 리스트 생성
        drugNames = []
        for drugCode in drugList:
            queryset = drug.objects.filter(
                    Q(drug_no__exact=drugCode)
                    ).values("drug_name")
            
            drugNames.append(queryset[0]["drug_name"])


        # 약 이름 리스트를 랭체인 클래스에 넘겨서 상호작용페이지 표시에 필요한 데이터를 받아온다.
        mutualLangchain = MutulaLangchain(drugNames)
        langChainData = mutualLangchain.run()

        # 고객 아이디와 약 번호 리스트로 동일 성분 약의 정보와 가격을 받아온다.
        priceCalculator = MedicinePrice(customer_drug)
        price = priceCalculator.run()

        if langChainData and price:
            with open("./chain/jsonfolder/result_data.json", "w") as f:
                json.dump({"langChainData": langChainData, "priceData": price}, f)
            return JsonResponse({"message": "save successful"}, status=200)
        else:
            return JsonResponse({"data": "none"}, status=404)
    
    elif request.method == "GET":
        try:
            with open("./chain/jsonfolder/result_data.json", "r") as f:
                sendData = json.load(f)
            return JsonResponse(sendData, status=200)
        except:
            return JsonResponse({"message": "Data not found"}, status=404)

    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)



######################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 의약품 상세정보 및 질병정보 제공 페이지 구현
######################################################

@csrf_exempt
def aianalyzeinfo(request):
    if request.method == "POST":
        # 데이터 추출
        data = json.loads(request.body)
        print(data)

        drug_no = data["params"]["customer_drugs"]

            
        # drug_no가 일치하는 약의 데이터를 가져온다
        query = drug.objects.filter(
            Q(drug_no__exact=drug_no)
        )

        # 해당하는 약이 없으면 404 반환
        if not query:
            return JsonResponse({"message": "약품정보가 없습니다."}, status=404)        

        # response용 데이터로
        item = query[0]

        # 질병 정보에 대해서 랭체인을 통해 답변을 얻어온다.
        illnessLnagchain = IllnessLangchain(item.drug_illness)
        illnessdata = illnessLnagchain.run()

        drug_data = {
            "drug_no": item.drug_no,
            "drug_name": item.drug_name,
            "drug_price": item.drug_price,        
            "drug_effect": item.drug_effect,
            "drug_sideeffect": item.drug_sideeffect,
            "drug_caution": item.drug_caution,
            "drug_save": item.drug_save,
            "illness_reason": illnessdata[0],
            "illness_food": illnessdata[1],
            "illness_qa": illnessdata[2]
        }

        # 입력받은 약과 같은 성분의 약 3개를 반환
        similarDrugFind = SimilarDrugFind(drug_no)
        similarDrugs = similarDrugFind.run()

        with open("./chain/jsonfolder/info_data.json", "w") as f:
            json.dump({"data": [drug_data], "similar_drug": similarDrugs}, f)
        return JsonResponse({"message": "save successful"}, status=200)

    elif request.method == "GET":
        with open("./chain/jsonfolder/info_data.json", "r") as f:
            sendData = json.load(f)
        return JsonResponse(sendData, status=200)

    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
