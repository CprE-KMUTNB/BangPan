from cgitb import lookup
from unicodedata import category, name
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import Donation_blogs
from logging.config import valid_ident
from wsgiref import validate

# Serializers define the API representation.

class Donation_blogsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation_blogs
        fields = '__all__'
  



