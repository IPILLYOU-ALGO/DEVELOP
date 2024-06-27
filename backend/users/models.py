##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager): #사용자 생성
    """ Custom User Manager Definition """
    def create_user(self, customer_id, email=None, password=None, **extra_fields):
        """ Create and return a user with an email, customer_id, and password """
        if not customer_id:
            raise ValueError('The Customer ID field must be set') #customer_id없을 때 valueerror
        email = self.normalize_email(email)
        user = self.model(customer_id=customer_id, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, customer_id, email=None, password=None, **extra_fields): #사용자 관리자 페이지 생성
        """ Create and return a user with superuser permissions """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        user = self.create_user(customer_id, email, password, **extra_fields)
        # 기본값 설정
        Customer.objects.create(user=user, sex='male', age='20_early')
        return user

class User(AbstractUser): #사용자정의
    """ Custom User Model Definition """
    username = None
    customer_id = models.CharField(max_length=150, unique=True)
    objects = CustomUserManager()
    first_name = None
    last_name = None

    USERNAME_FIELD = 'customer_id'
    REQUIRED_FIELDS = []

class Customer(models.Model): #고객정의
    """ Customer Model Definition """
    SEX_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    AGE_CHOICES = [
        ('20_early', '20 Early'),
        ('20_late', '20 Late'),
        ('30_early', '30 Early'),
        ('30_late', '30 Late'),
        ('40_early', '40 Early'),
        ('40_late', '40 Late'),
        ('50_early', '50 Early'),
        ('50_late', '50 Late'),
        ('60_early', '60 Early'),
        ('60_late', '60 Late'),
        ('70_early', '70 Early'),
        ('70_late', '70 Late'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer_profile')
    sex = models.CharField(max_length=6, choices=SEX_CHOICES)
    age = models.CharField(max_length=10, choices=AGE_CHOICES)

    def __str__(self):
        return self.user.customer_id
    
