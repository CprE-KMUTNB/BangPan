from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse
from category.models import Category
from .models import Donation_blogs
# Create your views here.

def index(request):
    categories = Category.objects.all()
    blog = Donation_blogs.objects.all()
    #ให้เรียง primary key จากมากไปน้อย 
    latests = Donation_blogs.objects.all().order_by('-pk')[:2]
    return render(request,"frontend/index.html",{'categories':categories,'blogs':blog,'latests':latests})


   