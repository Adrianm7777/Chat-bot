from django.shortcuts import render
from rest_framework import generics
from .models import ChatBotResponse
from .serializers import ChatBotResponseSerialzer
import spacy
from rest_framework.response import Response
from .models import ChatBotResponse
from rest_framework.views import APIView
from transformers import pipeline
from rest_framework.decorators import api_view

class ChatBotResponseListCreate(generics.ListCreateAPIView):
    queryset = ChatBotResponse.objects.all()
    serializer_class = ChatBotResponseSerialzer

gpt2 = pipeline('text-generation', model='gpt2')

@api_view(['POST'])
def chatbot_ask(request):
    question = request.data.get('question', '')

    if question:
        result = gpt2(question, max_length=50, num_return_sequences=1, truncation=True)
        answer = result[0]['generated_text']

    else:
        answer = "Please ask a question."

    return Response({'response':answer})