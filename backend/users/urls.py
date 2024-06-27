##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################

""" URL Configuration for users app. """
from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
