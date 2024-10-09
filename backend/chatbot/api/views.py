from django.shortcuts import render
from rest_framework import generics
from .models import ChatBotResponse
from .serializers import ChatBotResponseSerialzer

class ChatBotResponseListCreate(generics.ListCreateAPIView):
    queryset = ChatBotResponse.objects.all()
    serializer_class = ChatBotResponseSerialzer
