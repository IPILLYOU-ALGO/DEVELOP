##################################################################
#개발자: 양정원(won15367)
#기간: 2024.06.17 ~ 2024.06.25
#구현기능: 의약품 분석결과 및 가격비교 페이지 및 상세정보 페이지 구현
##################################################################

from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),

    path('aianalyzelist/aianalyzeresult/', views.aianalyzeresult, name="aianalyzeresult"),
    path('aianalyzelist/aianalyzeinfo/', views.aianalyzeinfo, name="aianalyzeinfo"),

]