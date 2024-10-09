from django.shortcuts import render
from rest_framework import generics
from .models import ChatBotResponse
from .serializers import ChatBotResponseSerialzer
import spacy
from rest_framework.response import Response
from .models import ChatBotResponse
from rest_framework.views import APIView

class ChatBotResponseListCreate(generics.ListCreateAPIView):
    queryset = ChatBotResponse.objects.all()
    serializer_class = ChatBotResponseSerialzer

nlp = spacy.load('en_core_web_sm')

class ChatbotAnswerView(APIView):
    def post(self,request):
        user_question = request.data.get('question')

        if not user_question:
            return Response({'error':'No question provided.'},status=400)
        
        user_question_doc = nlp(user_question)

        best_match = None
        best_similarity = 0

        for response in ChatBotResponse.objects.all():
            response_doc = nlp(response.question)
            simlarity = user_question_doc.similarity(response_doc)

            if simlarity > best_similarity:
                best_similarity = simlarity
                best_match = response

            if best_match:
                return Response({"question": best_match.question, "response": best_match.response})
            
            return Response({"message": "Sorry, I don't have an answer for that."})