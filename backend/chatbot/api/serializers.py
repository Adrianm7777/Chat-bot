from rest_framework import serializers
from .models import ChatBotResponse

class ChatBotResponse(serializers.ModelSerializer):
    class Meta:
        model = ChatBotResponse
        fields = '__all__'
