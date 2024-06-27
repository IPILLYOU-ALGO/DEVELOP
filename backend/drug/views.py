###########################################################
#개발자: 김혜인(Hennnni), 양하영, 양정원
#기간: 2024.06.20 ~2024.06.25
#구현기능: ERD DRUG, DRUG_DETAIL 구축, 알약 찾기 모델 연결,알약 발견, 알약 분석
###########################################################
import os

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ai.models.bag_ocr.pytesseractocr import read_bag
from ai.models.pill_ocr.main import read_pills
from users.models import Customer

from .models import Drug, DrugDetail
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.http import JsonResponse


@method_decorator(csrf_exempt, name='dispatch')
class UploadPillImageView(APIView):
    """ Upload Pill Image View """
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]
    
    def get_customer(self, request):
        """ Get customer """
        print('aaa')
        user = request.user
        try:
            customer = Customer.objects.get(user=user)
        except Customer.DoesNotExist:
            return None
        return customer
    
    def post(self, request):
        """ Upload Pill Image """
        if 'image' not in request.data:
            return Response({
                "status_code": 400,
                "message": "Invalid image data"
            }, status=status.HTTP_400_BAD_REQUEST)

        image = request.data['image']
        fs = FileSystemStorage(
            location='media/source', 
            base_url='media/source'
        )
        
        save_file = None  # Initialize save_file variable
        try:
            myImage = request.FILES['image']
            print("파일이름 : ", myImage.name)
            save_file = fs.save(myImage.name, myImage)
            print("save_file = ", save_file)
            org_img = './media/source/' + save_file
        except Exception as e:
            print("error", str(e))
            return Response({
                "status_code": 500,
                "message": "An error occurred while saving the file."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        # 모델 불러오기
        pill_no_list = read_pills(org_img)
        print("Pill Read Result", pill_no_list)
        customer = self.get_customer(request)
        for pill_no in pill_no_list:
            try:
                drug = Drug.objects.get(drug_no=pill_no)
                print(drug.drug_no, drug.drug_name, "found")
                DrugDetail.objects.create(
                    customer_id=customer,
                    drug_no=drug.drug_no,
                    img_path=org_img,
                )
            except Drug.DoesNotExist:
                print(pill_no, "not found")
                continue
        return Response({
            "status_code": 200,
            "message": "Pill image uploaded successfully",
            "img_path": org_img
        }, status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class UploadBagImageView(APIView):
    """ Upload Bag Image View """
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]
    
    def get_customer(self, request):
        """ Get customer """
        user = request.user
        try:
            customer = Customer.objects.get(user=user)
        except Customer.DoesNotExist:
            return None
        return customer
    
    def post(self, request):
        """ Upload Bag Image """
        if 'image' not in request.data:
            return Response({
                "status_code": 400,
                "message": "Invalid image data"
            }, status=status.HTTP_400_BAD_REQUEST)

        myImage = request.data['image']
        fs = FileSystemStorage(
            location='media/source', 
            base_url='media/source'
        )
        
        save_file = None  # Initialize save_file variable
        try:
            print("이미지 : ", myImage)
            save_file = fs.save('test.jpg', myImage)
            print("save_file = ", save_file)
            org_img = './media/source/' + save_file
        except Exception as e:
            print("error", str(e))
            return Response({
                "status_code": 500,
                "message": "An error occurred while saving the file."
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        org_img = '/home/ai/ai/aitech3/backend3/media/source/test1.jpg'
        drug_names = read_bag(save_file, org_img)
        print("Bag Read Result", drug_names)
        customer = self.get_customer(request)
        for d_name in drug_names:
            try:
                #drug = Drug.objects.get(drug_name=d_name)
                print(f"약이름:{d_name}")
                drug = Drug.objects.filter(drug_name__contains=d_name)
                print(drug[0].drug_no, drug[0].drug_name, "found")
                DrugDetail.objects.create(
                    customer_id=customer,
                    drug_no=drug[0].drug_no,
                    img_path=save_file
                )
                print("aaa")
            except Drug.DoesNotExist:
                print(d_name, "not found")
                continue
        return Response({
            "status_code": 200,
            "message": "Bag image uploaded successfully",
            "img_path": save_file
        }, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class DrugDetailView(APIView):
    """ Retrieve Drug Detail View """
    permission_classes = [IsAuthenticated]
    
    def get_customer(self, request):
        """ Get customer """
        user = request.user
        try:
            customer = Customer.objects.get(user=user)
        except Customer.DoesNotExist:
            return None
        return customer
    
    def get(self, request):
        """ Retrieve Drug Detail """
        customer = self.get_customer(request)
        if not customer:
            return Response({
                "status_code": 404,
                "message": "Customer not found"
            }, status=status.HTTP_404_NOT_FOUND)

        drug_details = DrugDetail.objects.filter(customer_id=customer)
        data = []
        for drug_detail in drug_details:
            data.append({
                "drug_no": drug_detail.drug_no.drug_no,
                "drug_name": drug_detail.drug_no.drug_name,
                "img_path": drug_detail.img_path
            })
        return Response({
            "status_code": 200,
            "message": "Drug detail retrieved successfully",
            "data": data
        }, status=status.HTTP_200_OK)

    

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from users.models import Customer, User
from .models import Drug, DrugDetail
from rest_framework.authtoken.models import Token
from django.db.models import Q

@csrf_exempt
def authenticate_user_by_token(token):
    try:
        user = User.objects.get(auth_token=token)
        return user
    except User.DoesNotExist:
        return None

@csrf_exempt
def analyze_results(request):
    token = request.GET.get('token')
    user = authenticate_user_by_token(token)

    customer=user

    if not user:
        return JsonResponse({
            "status_code": 401,
            "error": "User not authenticated"
        }, status=401)
    
    # customer = get_customer(user)
    if not customer:
        return JsonResponse({
            "status_code": 400,
            "error": "Customer not found"
        }, status=400)

    if request.method == 'GET':
        # drugs = Drug.objects.filter(customer=customer)  # customer와 관련된 Drug 객체들을 가져옴
        
        drugs = DrugDetail.objects.filter(
            Q(customer_id__exact=customer)
        )
        
        
        if drugs.exists():
            drug_list = []
            
            for drug in drugs:
                        
                drugs_2 = Drug.objects.filter(
                    Q(drug_no__exact=drug.drug_no)
                )
                
                drug = drugs_2[0]
                
                drug_list.append({
                    'status_code': 200,
                    'drug_no': drug.drug_no,
                    'drug_name': drug.drug_name,
                    'drug_name_en': drug.drug_name_en,
                    'drug_material': drug.drug_material,
                    'drug_company': drug.drug_company,
                    'drug_shape': drug.drug_shape,
                    'drug_color': drug.drug_color,
                    'drug_print_front': drug.drug_print_front,
                    'drug_print_back': drug.drug_print_back,
                    'drug_line_front': drug.drug_line_front,
                    'drug_line_back': drug.drug_line_back,
                    'drug_price_amount': drug.drug_price_amount,
                    'drug_price_unit': drug.drug_price_unit,
                    'drug_price': drug.drug_price,
                    'drug_illness': drug.drug_illness,
                    'drug_img_path': drug.drug_img_path
                })
            return JsonResponse({"data": drug_list}, safe=False)
        else:
            return JsonResponse({
                "status_code": 404,
                "error": "No drugs found"
            }, status=404)

    elif request.method == 'DELETE':  # DELETE 요청을 처리
        token = request.GET.get('token')
        customer_id_0 = authenticate_user_by_token(token)
        
        drug_nos = request.GET.getlist('drug_no')  # drug_no 파라미터를 리스트로 가져옴
        
        print(customer_id_0)
        print(drug_nos)
        
        if not drug_nos:  # drug_no 파라미터가 없는 경우
            return JsonResponse({
                "status_code": 400,
                "error": "Missing drug_no"
            }, status=400)  # 400 에러 반환

        DrugDetail.objects.filter(
            Q(customer_id__exact=customer_id_0) &
            Q(drug_no__exact=drug_nos[0])
        ).delete()  # drug_no와 customer_id가 일치하는 DrugDetail 객체들을 삭제
        
        return JsonResponse({
            "status_code": 200,
            "message": "Drugs deleted successfully"
        }, status=200)

    else:
        return JsonResponse({
            "status_code": 405,
            "error": "Invalid HTTP method"
        }, status=405)

@csrf_exempt
def aianalyzelist(request):
    token = request.GET.get('token')
    user = authenticate_user_by_token(token)
    
    if not user:
        return JsonResponse({
            "status_code": 401,
            "error": "User not authenticated"
        }, status=401)
        
    # -------------------------------------
    customer=user
    # -------------------------------------
    
    # customer = get_customer(user)
    if not customer:
        return JsonResponse({
            "status_code": 400,
            "error": "Customer not found"
        }, status=400)
    
    if request.method == 'GET':
        drugs = Drug.objects.filter(customer=customer)  # customer와 관련된 Drug 객체들을 가져옴

        if not drugs.exists():  # drugs가 없는 경우
            return JsonResponse({
                "status_code": 400,
                "error": "No drugs found for the customer"
            }, status=400)  # 400 에러 반환

        drug_list = []
        for drug in drugs:  # drug 객체를 순회
            drug_list.append({
                'status_code': 200,
                'drug_no': drug.drug_no,
                'drug_name': drug.drug_name,
                'drug_name_en': drug.drug_name_en,
                'drug_material': drug.drug_material,
                'drug_company': drug.drug_company,
                'drug_shape': drug.drug_shape,
                'drug_color': drug.drug_color,
                'drug_print_front': drug.drug_print_front,
                'drug_print_back': drug.drug_print_back,
                'drug_line_front': drug.drug_line_front,
                'drug_line_back': drug.drug_line_back,
                'drug_price_amount': drug.drug_price_amount,
                'drug_price_unit': drug.drug_price_unit,
                'drug_price': drug.drug_price,
                'drug_illness': drug.drug_illness,
                'drug_img_path': drug.drug_img_path
            })

        return JsonResponse(drug_list, safe=False)

    else:
        return JsonResponse({
            "status_code": 405,
            "error": "Invalid HTTP method"
        }, status=405)


