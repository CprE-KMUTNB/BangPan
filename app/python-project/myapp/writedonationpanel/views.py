from importlib.resources import path
from django.shortcuts import render
from blogs.models import Donation_blogs
from django.db.models import Sum 
import ctypes
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserChangeForm,AuthenticationForm,UserCreationForm
from django.contrib.auth import login,logout

# Create your views here.
@login_required(login_url='login')
def panel(request):

    writer = "JourneyQ"
    blogs = Donation_blogs.objects.filter(write=writer)
    total = Donation_blogs.objects.filter(write=writer).aggregate(Sum("views")) 
    blogCount = blogs.count()

    return render(request,"backend/index.html",{"blogs":blogs,"writer":writer,'blogCount':blogCount
    ,'total':total })