from django.urls import path
from . import views

urlpatterns = [
    path('risk/', views.profile_risk, name='risk'),
    
]