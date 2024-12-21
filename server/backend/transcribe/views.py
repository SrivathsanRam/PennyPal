from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json

@csrf_exempt
@api_view(['POST'])
def transcribe(request):
    try:
        # Parse the JSON data from the request body
        # Retrieve the input values (mocking here, but you can use them as needed)
        audio_file = request.data.get('audio')

        # Print input values to debug (optional)
        print(f"Audio File: {audio_file}")

        # Return a mock transcript response
        return Response({'transcription': 'I spent 5 dollars on food'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@api_view(['POST'])
def classify(request):
    try:
        # Parse the JSON data from the request body
        # Retrieve the input values (mocking here, but you can use them as needed)
        text = request.data.get('text')

        # Print input values to debug (optional)
        print(f"Text: {text}")

        # Return a mock classification response
        return Response({
        'type': 'Expense',
        'category': 'Food',
        'amount': 5,
        })

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)