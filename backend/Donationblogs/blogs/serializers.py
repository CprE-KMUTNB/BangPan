from cgitb import lookup
from dataclasses import field
from pyexpat import model
from unicodedata import category, name
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import Donation_blogs
from logging.config import valid_ident
from wsgiref import validate
from django.contrib.auth import get_user_model

User=get_user_model()
# Serializers define the API representation.

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username']


class Donation_blogsSerializer(serializers.ModelSerializer):

    write = UserSerializer()

    class Meta:
        model = Donation_blogs
        fields = '__all__'
        #depth = 1



