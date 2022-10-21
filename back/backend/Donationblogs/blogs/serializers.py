from cgitb import lookup
from unicodedata import category, name
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import Donation_blogs,Category

# Serializers define the API representation.
class Donation_blogsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation_blogs
        fields = '__all__'
        lookup_field = 'slug'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']
        

