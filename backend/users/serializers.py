##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################

from rest_framework import serializers
from .models import User, Customer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    """ Register serializer Definition """
    customer_id = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    age = serializers.ChoiceField(choices=Customer.AGE_CHOICES, required=True)
    sex = serializers.ChoiceField(choices=Customer.SEX_CHOICES, required=True)

    class Meta:
        """ Meta class """
        model = User
        fields = ('customer_id', 'password', 'age', 'sex')

    def create(self, validated_data):
        """ Create a new user """
        age = validated_data.pop('age')
        sex = validated_data.pop('sex')
        customer_id = validated_data.pop('customer_id')
        user = User.objects.create_user(
            customer_id=customer_id,
            password=validated_data['password']
        )
        Customer.objects.create(user=user, age=age, sex=sex)
        return user

class LoginSerializer(serializers.Serializer):
    """ Login serializer Definition """
    customer_id = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})
