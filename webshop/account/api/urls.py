from django.urls import path
from account.api.views import RegisterUserAPI, UpdateUserAPI
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
  path('signup/', RegisterUserAPI.as_view()),
  path('signin/', TokenObtainPairView.as_view()),
  path('update/', UpdateUserAPI.as_view())
]