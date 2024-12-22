from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Transaction

admin.site.register(Transaction)


# Register your models here.
