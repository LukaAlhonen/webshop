from django.urls import path
from app.api.views import *

urlpatterns = [
  #path('items/', ItemsAPI.as_view()),
  path(r'items/', ItemsAPI.as_view()),
  path('items/<uuid:id>/', ItemAPI.as_view()),
  path('items/<str:username>/myitems/', MyItemsAPI.as_view()),
  path('items/<str:username>/sold/', SoldItems.as_view()),
  path('items/<str:username>/bought/', BoughtItems.as_view()),
  path('items/purchase/', PurhcaseAPI.as_view()),
]
