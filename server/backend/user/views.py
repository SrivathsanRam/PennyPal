# views.py

import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view



# Sign Up View
@csrf_exempt 
@api_view(['POST'])
def signup(request):
    name = request.data.get('name')
    mobile_number = request.data.get('mobile_number')
    password = request.data.get("password")
    print(name, mobile_number, password)
    if User.objects.filter(username=mobile_number).exists():
        return JsonResponse({"error": "Mobile number already exists"}, status=400)

    user = User.objects.create_user(username=mobile_number, first_name=name, password=password)
    user.save()
    token = "sample_token"
    if user:
        return Response({
        'token': token,
        'user': {
            'name': user.first_name,
            'mobile_number': user.username,
        }
    })

# Sign In View
@csrf_exempt 
@api_view(['POST'])
def signin(request):
    mobile_number = request.data.get('mobile_number')
    password = request.data.get("password")
    print(mobile_number, password)
    user = authenticate(username=mobile_number, password=password)
    token = "sample_token"
    if user:
        return Response({
        'token': token,
        'user': {
            'name': user.first_name,
            'mobile_number': user.username,
        }
    })
    return JsonResponse({"error": "Invalid credentials"}, status=400)
