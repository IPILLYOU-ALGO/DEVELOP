##################################################
#개발자: 김혜인(Hennnni)
#기간: 2024.06.16~2024.06.23
#구현기능: ERD USER 구축, 로그인/회원가입 기능 구축
##################################################
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Customer


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """ Custom User Admin Definition """
    list_display = (
        "customer_id",
        "is_active",
        "is_staff",
    )
    search_fields = ("customer_id",)
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "customer_id",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    fieldsets = (
        (None, {"fields": ("customer_id", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    ordering = ('customer_id',)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    """ Customer Admin Definition """
