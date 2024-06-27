##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################
from django.contrib import admin
from .models import Drug, Search, DrugDetail

@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    """ Drug Admin Definition """
    list_display = ('drug_no', 'drug_name', 'drug_company', 'drug_price', 'drug_illness')
    search_fields = ('drug_no', 'drug_name', 'drug_company', 'drug_material', 'drug_illness')
    list_filter = ('drug_company', 'drug_illness')
    ordering = ('drug_no',)

@admin.register(Search)
class SearchAdmin(admin.ModelAdmin):
    """ Search Admin Definition """

@admin.register(DrugDetail)
class DrugDetailAdmin(admin.ModelAdmin):
    """ Drug Detail Admin Definition """
