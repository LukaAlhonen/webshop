from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from django.contrib.auth.models import User
from app.models import Item
import random
from app.api.serializers import ItemSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def hello_world(request):
    return HttpResponse('Hello, World!')

def getLandingPage(request):
    items = Item.objects.count()
    users = User.objects.filter(is_active=True).count()
    return render(request, 'landing_page.html', {'items': items, 'users': users})
@csrf_exempt
def populateDB(request):
    # Delete all existing users and items
    Item.objects.all().delete()
    User.objects.all().delete()

    # Generate new users
    newUsers = []
    for i in range(1,7):
        newUsers.append({
            'username': 'testuser'+str(i),
            'email': 'testuser'+str(i)+'@shop.aa',
            'password': 'pass'+str(i)
            })
    # Populate db with new users
    for user in newUsers:
        User.objects.create_user(username = user['username'], email=user['email'], password=user['password'])
    
    # Generate new items and assign sellers
    newItems = []
    sellers = [User.objects.get(username='testuser1'),User.objects.get(username='testuser2'),User.objects.get(username='testuser3')]
    i = 0
    for seller in sellers:
        for i in range(1,11):
            newItems.append({
                'name': seller.username + '\'s ' + str(i) + 'th item',
                'description': 'description of item'+str(i),
                'price': random.randrange(10,100),
                'seller': seller.id
                })
    
    # Populate db with new items
    for item in newItems:
        serializer = ItemSerializer(data = item)
        if(serializer.is_valid()):
            serializer.save()
        else:
            print(serializer.errors)
    
    return HttpResponse('DB items populated')