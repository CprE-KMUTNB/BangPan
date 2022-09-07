from re import template
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Members

# Create your views here.
def index(request):
    mymembers = Members.objects.all().values()
    output = ""
    for x in mymembers:
        output += x["firstname"]

    #template = loader.get_template('myfirst.html')
    return HttpResponse(output)