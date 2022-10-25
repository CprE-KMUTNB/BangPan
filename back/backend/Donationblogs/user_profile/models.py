import email
from django.db import models
from django.contrib.auth import get_user_model

User=get_user_model()
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, default='')
    last_name = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=20, default='')
    email = models.EmailField(max_length=254, default='')

    def __str__(self):
        return self.first_name