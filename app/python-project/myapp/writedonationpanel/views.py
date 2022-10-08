from importlib.resources import path
from django.shortcuts import render
from blogs.models import Donation_blogs

# Create your views here.
def panel(request):

    blogs = Donation_blogs.objects.all()
    return render(request,"backend/index.html",{"blogs":blogs})