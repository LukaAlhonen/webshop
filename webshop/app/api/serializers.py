from rest_framework import serializers
from app.models import Item

class ItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Item
    fields = ('id', 'seller', 'buyer', 'name', 'description', 'price', 'image', 'date_added', 'sold')

#class TransactionSerializer(serializers.ModelSerializer):
#  class Meta:
#    model = Transaction
#    fields = ('id', 'item', 'seller', 'buyer', 'date')