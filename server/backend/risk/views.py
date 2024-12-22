from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

@csrf_exempt
@api_view(['POST'])
def profile_risk(request):
    try:
        # Parse the JSON data from the request body
        # Retrieve the input values (mocking here, but you can use them as needed)
        quiz_score = request.data.get('quizScore')
        monthly_income = request.data.get('monthlyIncome')
        monthly_remittance = request.data.get('monthlyRemittance')
        monthly_savings = request.data.get('monthlySavings')

        # Print input values to debug (optional)
        print(f"Quiz Score: {quiz_score}, Monthly Income: {monthly_income}, "
                f"Monthly Remittance: {monthly_remittance}, Monthly Savings: {monthly_savings}")

        # Return a mock risk level response
        return JsonResponse({'riskLevel': 0}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



@csrf_exempt
@api_view(['POST'])
def profile_suggestions(request):
    suggestion_list = ["Spend Less Money", "Save More Money", "Improve Financial Literacy"]
    try:
        # Parse the JSON data from the request body
        # Retrieve the input values (mocking here, but you can use them as needed)
        quiz_score = request.data.get('quizScore')
        monthly_income = request.data.get('monthlyIncome')
        monthly_remittance = request.data.get('monthlyRemittance')
        monthly_savings = request.data.get('monthlySavings')

        # Print input values to debug (optional)
        print(f"Quiz Score: {quiz_score}, Monthly Income: {monthly_income}, "
                f"Monthly Remittance: {monthly_remittance}, Monthly Savings: {monthly_savings}")

        # Return a mock risk level response
        return JsonResponse({'riskLevel': 0}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)