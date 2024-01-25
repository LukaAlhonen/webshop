from rest_framework.views import APIView
from rest_framework.response import Response
from account.api.serializers import RegisterUser, UserSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

class RegisterUserAPI(APIView):
  def post(self, request):
    print(request.data)
    print(type(request.data))
    serializer = RegisterUser(data = request.data)
    serializer.is_valid(raise_exception = True)

    data = serializer.validated_data
    user = User.objects.create_user(username = data['username'], email = data['email'], password = data['password'])

    Token.objects.create(user = user)
    user_serializer = UserSerializer(user)

    return Response(user_serializer.data)

class UpdateUserAPI(APIView):
  def get(self, request):
    return Response({'message': 'ueye'})
  def put(self, request):
    data = request.data
    user = User.objects.get(username=data['username'])
    user.set_password(data['password'])
    user.save()
    
    return Response({'message': 'password updated'})