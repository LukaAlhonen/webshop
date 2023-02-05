from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from app.models import Item
from app.api.serializers import ItemSerializer
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core.mail import send_mail

class ItemPaginator(PageNumberPagination):
  page_size = 10
  max_page_size = 10
  page_size_query_param = 'page_size'

class ItemsAPI(GenericAPIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]
  serializer_class = ItemSerializer
  pagination_class = ItemPaginator
  
  def get_queryset(self):
    return Item.objects.all()

  def get(self, request):
    filter = request.GET.get('filter')
    username = request.GET.get('username')
    items = None
    if not username:
      if not filter:
        items = self.get_queryset().filter(sold=False)
      else:
        items = self.get_queryset().filter(name__contains=filter, sold=False)
    else:
      id = User.objects.get(username=username).id
      if not filter:
        items = self.get_queryset().filter(sold=False).exclude(seller=id)
      else:
        items = self.get_queryset().filter(name__contains=filter, sold=False).exclude(seller=id)
    page = self.paginate_queryset(items)
    if page:
      serializer = ItemSerializer(page, many = True)
      data = serializer.data
    else:
      data = []
    return self.get_paginated_response(data)
  
  def post(self, request):
    data = request.data
    setattr(data, '_mutable', True)
    seller_id = User.objects.get(username = data['username']).id
    data.pop('username')
    data['seller'] = seller_id
    serializer = ItemSerializer(data = data)    
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    else:
      print(serializer.errors)
      return Response(serializer.errors, status = 400)

class ItemAPI(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]

  def get(self, request, id):
    item = get_object_or_404(Item, id=id)
    serializer = ItemSerializer(item)
    return Response(serializer.data)

  def delete(self, request, id):
    item = get_object_or_404(Item, id=id)
    item.delete()
    return Response({
      'message': 'Item deleted'
    })
  def put(self, request, id):
    item = get_object_or_404(Item, id=id)
    try:
      price = int(request.data['price'])
      item.price = price
      item.save()
      retval = Response({'message': 'price updated'}, status=200)
    except:
      print("uh oh")
      retval = Response({'message': 'incorrect price typ'}, status=400)
    return retval

class PurhcaseAPI(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]
  def post(self, request):
    data = request.data
    item_ids = data['items']
    username = data['username']
    soldItems = Item.objects.filter(sold=True)
    items = []
    for id in item_ids:
      try:
        item = soldItems.get(id=id)
        if item.sold:
          items.append(item.id)
      except:
        continue
    if(len(items) > 0):
      return JsonResponse(items, safe=False)
    else:
      for id in item_ids:
        item = Item.objects.get(id=id)
        item.sold = True
        item.buyer = User.objects.get(username=username)
        item.save()
        str1 = 'Thank you for purchasing %s'%item.name
        str2 = 'Your item \'%s\' has been sold!'%item.name
        send_mail('Your Purchase', str1, 'no_reply@shop.aa', [item.buyer.email], fail_silently=False)
        send_mail(item.name, str2, 'no_reply@shop.aa', [item.seller.email], fail_silently=False)
    return Response({'message': 'purchase complete'})

class MyItemsAPI(GenericAPIView):
  serializer_class = ItemSerializer
  pagination_class = ItemPaginator
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]

  def get(self, request, username):
    id = User.objects.get(username = username).id
    items = Item.objects.filter(seller=id)
    page = self.paginate_queryset(items)
    if page:
      serializer = ItemSerializer(page, many=True)
      data = serializer.data
    else:
      data = []
    return self.get_paginated_response(data)

class SoldItems(GenericAPIView):
  serializer_class = ItemSerializer
  pagination_class = ItemPaginator
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]
  def get(self, request, username):
    id = User.objects.get(username = username).id
    items = Item.objects.filter(seller=id, sold=True)
    page = self.paginate_queryset(items)
    if page:
      serializer = ItemSerializer(page, many=True)
      data = serializer.data
    else:
      data = []
    return self.get_paginated_response(data)

class BoughtItems(GenericAPIView):
  serializer_class = ItemSerializer
  pagination_class = ItemPaginator
  permission_classes = [IsAuthenticatedOrReadOnly]
  authentication_classes = [JWTAuthentication]
  def get(self, request, username):
    id = User.objects.get(username = username).id
    items = Item.objects.filter(buyer=id, sold=True)
    page = self.paginate_queryset(items)
    if page:
      serializer = ItemSerializer(page, many=True)
      data = serializer.data
    else:
      data = []
    return self.get_paginated_response(data)