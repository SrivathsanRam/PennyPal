from django.urls import path
from . import views

urlpatterns = [
    path('add_transaction/', views.add_transaction, name='add_transaction'),
    path('delete_transaction/', views.delete_transaction, name='delete_transaction'),
    path('get_transaction/', views.get_transaction, name='get_transaction'),
]