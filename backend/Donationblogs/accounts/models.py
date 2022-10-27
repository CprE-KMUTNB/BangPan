from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self,username,password,**extra_fields):
        if not username:
            raise ValueError('Please enter an username address')


        new_user=self.model(username=username,**extra_fields)

        new_user.set_password(password)

        new_user.save()

        return new_user


    def create_superuser(self,username,password,**extra_fields):

        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')


        return self.create_user(username,password,**extra_fields)


class User(AbstractUser):
    username=models.CharField( max_length=40,unique=True)
    date_joined=models.DateTimeField(auto_now_add=True)


    USERNAME_FIELD='username'

    def __str__(self):
        return self.username