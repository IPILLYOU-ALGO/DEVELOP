###########################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.20 ~2024.06.25
#구현기능: ERD DRUG, DRUG_DETAIL 구축, 알약 찾기 모델 연결
###########################################################
""" URL Configuration for drugs app. """
from django.urls import path
from .views import UploadBagImageView, UploadPillImageView, DrugDetailView
from . import views


urlpatterns = [
    path('upload/pill/', UploadPillImageView.as_view(), name='pill'),
    path('upload/bag/', UploadBagImageView.as_view(), name='bag'),
    path('detail/', DrugDetailView.as_view(), name='detail'),
    path('analyze/results/', views.analyze_results, name='analyze_results'),
    path('aianalyzelist/', views.aianalyzelist, name='aianalyzelist'),
]
