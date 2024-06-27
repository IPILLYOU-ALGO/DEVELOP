###########################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.20 ~2024.06.25
#구현기능: ERD DRUG, DRUG_DETAIL 구축, 알약 찾기 모델 연결
###########################################################
from django.apps import AppConfig


class DrugsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'drugs'
