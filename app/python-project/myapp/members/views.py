from multiprocessing import context
from re import template
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader

import members
from .models import Members
from django.urls import reverse

# Create your views here.
def index(request):
    mymembers = Members.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'mymembers' : mymembers
    } 
    return HttpResponse(template.render(context,request))


def add(request):
    template = loader.get_template('add.html')
    return HttpResponse(template.render({},request))

#รับค่าจาก add
def addrecord(request):
    firstname = request.POST['first']
    lastname = request.POST['last']
    member = Members(firstname = firstname, lastname =lastname)
    member.save()
    return HttpResponseRedirect(reverse('index'))

def delete(request,id):
    member = Members.objects.get(id = id)
    member.delete()
    return HttpResponseRedirect(reverse('index'))