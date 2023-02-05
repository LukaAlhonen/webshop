from django.db import models
import uuid
from django.contrib.auth.models import User
# Create your models here.

class Item(models.Model):
  id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False, unique = True)
  name = models.CharField(max_length = 80, blank = False)
  description = models.CharField(max_length = 200, blank = False)
  price = models.IntegerField(blank = False)
  image = models.ImageField(upload_to='images', default='/images/img2.jpg')
  seller = models.ForeignKey(User, related_name='seller', on_delete=models.CASCADE)
  buyer = models.ForeignKey(User, related_name='buyer', on_delete=models.CASCADE, null=True, blank=True)
  date_added = models.DateTimeField(auto_now_add = True)
  sold = models.BooleanField(default=False, blank = True)
  
  class Meta:
    ordering = ['-date_added']