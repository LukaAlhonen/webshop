from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email')

class RegisterUser(serializers.Serializer):
  username = serializers.CharField(required = True)
  email = serializers.EmailField(required = True)
  password = serializers.CharField(required = True, write_only = True)