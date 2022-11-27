from ast import FloorDiv
from email.policy import default
from itertools import count
from django.db import models
from datetime import datetime,timedelta
from django.template.defaultfilters import slugify
from django.contrib.auth import get_user_model
from django.db.models.functions import Now

User=get_user_model()
class Category_Object(models.TextChoices):
    
    CLOTHES     = 'เสื้อผ้า'
    TROUSERS    = 'กางเกง'
    SHOSE       = 'รองเท้า'
    FOODANDDRUG = 'อาหารและยา'
    DONATION    = 'เงินบริจาค'
    APPLIANCE   = 'ของใช้'

class Category_User(models.TextChoices):
    
    KID         = 'เด็กเล็ก'
    TEENAGER    = 'เด็กโต'
    ADULT       = 'ผู้ใหญ่'
    GRAYBEARD   = 'คนชรา'
    CRIPPLE     = 'คนพิการ'


# Create your models here.
class Donation_blogs(models.Model):
    
    name = models.CharField(max_length=255)
    write = models.ForeignKey(User,on_delete=models.CASCADE)
    description =  models.TextField()
    reason = models.TextField()
    location = models.TextField()
    Amount_requested = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    image = models.ImageField(upload_to='blogImages',blank = True)
    created = models.DateTimeField(auto_now_add=True)
    category_object = models.CharField(max_length=50, choices=Category_Object.choices, default=Category_Object.APPLIANCE)
    category_user = models.CharField(max_length=50, choices=Category_User.choices, default=Category_User.KID)
    report = models.IntegerField(default=0)
    
    #timestamp = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.name
