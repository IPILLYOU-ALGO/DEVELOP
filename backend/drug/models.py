###########################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.20 ~2024.06.25
#구현기능: ERD DRUG, DRUG_DETAIL 구축, 알약 찾기 모델 연결
###########################################################
from django.db import models

# Create your models here.
class Drug(models.Model):
    """ Drug Model Definition """
    drug_no = models.CharField(max_length=20, primary_key=True)
    drug_name = models.CharField(max_length=200)
    drug_name_en = models.CharField(max_length=200)
    drug_material = models.CharField(max_length=50)
    drug_company = models.CharField(max_length=200)
    drug_shape = models.CharField(max_length=20)
    drug_color = models.CharField(max_length=100)
    drug_print_front = models.CharField(max_length=100, null=True, blank=True)
    drug_print_back = models.CharField(max_length=100, null=True, blank=True)
    drug_line_front = models.CharField(max_length=20, null=True, blank=True)
    drug_line_back = models.CharField(max_length=20, null=True, blank=True)
    drug_price_amount = models.FloatField()
    drug_price_unit = models.CharField(max_length=20)
    drug_price = models.IntegerField()
    drug_illness = models.CharField(max_length=20)
    drug_img_path = models.CharField(max_length=400)
    
    drug_effect = models.TextField(null=True, blank=True)
    drug_save = models.TextField(null=True, blank=True)
    drug_sideeffect = models.TextField(null=True, blank=True)
    drug_caution = models.TextField(null=True, blank=True)
    drug_classify = models.CharField(max_length=20, null=True)


    class Meta:
        """ Meta class """
        db_table = 'drug'
        managed = True # FIXME: Change this to False if you want to use the existing table

    def __str__(self):
        return self.drug_name
    


class Search(models.Model):
    """ Search Model Definition """
    search_id = models.AutoField(primary_key=True)
    customer_id = models.CharField(max_length=36)
    drug_no = models.ForeignKey(Drug, on_delete=models.CASCADE, db_column='drug_no')
    search_ip = models.CharField(max_length=20)
    search_date = models.CharField(max_length=100)
    drug_name = models.CharField(max_length=200)
    search_response = models.CharField(max_length=100)

    class Meta:
        """ Meta class """
        db_table = 'search'
        verbose_name_plural = 'Search'
        managed = True # FIXME: Change this to False if you want to use the existing table

    def __str__(self):
        return f"{self.search_id} - {self.drug_no.drug_name}"

class DrugDetail(models.Model):
    """ Drug Detail Model Definition """
    customer_id = models.CharField(max_length=36)
    drug_no = models.CharField(max_length=20)
    img_path = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        """ Meta class """
        db_table = 'drug_details'
        verbose_name_plural = 'Drug Details'
        managed = True # FIXME: Change this to False if you want to use the existing table

    def __str__(self):
        return self.drug_name
