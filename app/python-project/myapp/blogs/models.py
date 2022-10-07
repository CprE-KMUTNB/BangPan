from distutils.command.upload import upload
from email.mime import image
import imp
from pydoc import describe
from pyexpat import model
from statistics import mode
from unicodedata import category
from venv import create
from django.db import models
from category.models import Category
# Create your models here.
class Donation_blogs(models.Model):
    name = models.CharField(max_length=255)
    write = models.CharField(max_length=255)
    description = models.TextField()
    reason = models.TextField()
    location = models.TextField()
    Amount_requested = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    image = models.ImageField(upload_to='blogImages',blank = True)
    created = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE) # ต้องลบบทความทั้งหมดก่อนจึงจะลบหมวดหมู่ได้

    def __str__(self) :

        return self.name
