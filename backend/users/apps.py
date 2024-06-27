##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################
from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
