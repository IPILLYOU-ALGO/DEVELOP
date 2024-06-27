##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################
""" User views """
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView


from .models import User
from .serializers import LoginSerializer, RegisterSerializer


class RegisterView(APIView):
    """ Register a new user """
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("RegisterView")
        print(request.data)
        """ Create a new user """
        serializer = RegisterSerializer(data=request.data)
        print("serializer ok")
        print(serializer)
        if serializer.is_valid():
            print("serializer is_valid in")
            user = serializer.save()
            token = Token.objects.create(user=user)
            print("serializer is_valid out")
            return Response({
                "status_code": status.HTTP_201_CREATED,
                "message": "Registration successful",
                "user_id": user.pk,
                "customer_id": user.customer_id,
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        if User.objects.filter(customer_id=request.data['customer_id']).exists():
            print("serializer filter in")
            return Response({
                "status_code": status.HTTP_409_CONFLICT,
                "message": "User already exists"
            }, status=status.HTTP_409_CONFLICT)
        print("serializer return in")
        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            "message": "Bad request",
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    """ 사용자 로그인 """
    def post(self, request):
        """ 사용자 인증 """
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            customer_id = serializer.validated_data['customer_id']
            password = serializer.validated_data['password']
            user = authenticate(customer_id=customer_id, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'status_code': status.HTTP_200_OK,
                    'message': '로그인 성공',
                    'user_id': user.pk,
                    'customer_id': user.customer_id,
                    'token': token.key
                 }, status=status.HTTP_200_OK)
            # else:
            #     # 비밀번호가 잘못된 경우
            #     return Response({
            #         "status_code": status.HTTP_400_BAD_REQUEST,
            #         "message": "잘못된 자격 증명"
            #     }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            "message": "잘못된 요청"
        }, status=status.HTTP_400_BAD_REQUEST)
