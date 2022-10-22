from ast import FloorDiv
from email.policy import default
from itertools import count
from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Category_Object(models.TextChoices):
    
    CLOTHES     = 'เสื้อผ้า'
    SHOSE       = 'รองเท้า'
    FOOD        = 'อาหาร'
    DRUG        = 'ยา'
    APPLIANCE   = 'ของใช้'

class Category_User(models.TextChoices):
    
    KID         = 'เด็ก'
    ADULT       = 'ผู้ใหญ่'
    GRAYBEARD   = 'คนชรา'
    CRIPPLE     = 'คนพิการ'


# Create your models here.
class Donation_blogs(models.Model):
    
    name = models.CharField(max_length=255)
    write = models.CharField(max_length=255)
    description =  models.TextField()
    reason = models.TextField()
    location = models.TextField()
    Amount_requested = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    image = models.ImageField(upload_to='blogImages',blank = True)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField()
    category_object = models.CharField(max_length=50, choices=Category_Object.choices, default=Category_Object.APPLIANCE)
    category_user = models.CharField(max_length=50, choices=Category_User.choices, default=Category_User.KID)
    
    def save(self, *args, **kwargs):
        original_slug = slugify(self.name)
        queryset = Donation_blogs.objects.all().filter(slug__iexact=original_slug).count()

        count= 1
        slug = 'db'+ original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Donation_blogs.objects.all().filter(slug__iexact=slug).count()

            #ตั้งชื่อจนกว่าจะไม่ซ้ำ

        self.slug = slug

        super(Donation_blogs,self).save(*args,**kwargs)

    def __str__(self):
        return self.name
