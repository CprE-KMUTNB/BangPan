from unicodedata import name
from django.db import models

# Create your models here.
class Category(models.Model):
    
    name = models.CharField(max_length=255,unique=True) # unique=True ห้ามตั้งชื่อซ้ำ

    def __str__(self):
        return self.name