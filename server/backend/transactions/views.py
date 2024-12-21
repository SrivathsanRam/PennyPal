from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import Transaction
import json

@csrf_exempt
@api_view(['POST'])
def add_transaction(request):
    try:
        data = json.loads(request.body)
        transaction_type = data.get('type')
        category = data.get('category')
        amount = data.get('amount')
        description = data.get('description', '')
        mobile_number = data.get('mobile_number')

        if not all([transaction_type, category, amount]):
            return JsonResponse({"error": "Missing required fields."}, status=400)

        transaction = Transaction.objects.create(
            transaction_type=transaction_type,
            category=category,
            amount=amount,
            description=description,
            mobile_number=mobile_number
        )
        return JsonResponse({"message": "Transaction added successfully.", "transaction_id": transaction.id}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@api_view(['DELETE'])
def delete_transaction(request):
    try:
        transaction_id = request.data.get('transaction_id')
        transaction = get_object_or_404(Transaction, id=transaction_id)
        transaction.delete()
        return JsonResponse({"message": "Transaction deleted successfully."}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
@api_view(['POST'])
def get_transaction(request):
    try:
        #print("HELLO"+str(request.data))
        mobile_number = request.data.get('mobile_number')
        if not mobile_number:
            return JsonResponse({'error': 'Mobile Number parameter is required'}, status=400)
        
        transactions = Transaction.objects.filter(mobile_number=mobile_number).values(
            'id', 'transaction_type', 'category', 'amount', 'description', 'date'
        )
        return JsonResponse({'transactions': list(transactions)}, status=200)
    except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)