from contextlib import redirect_stderr
from multiprocessing import context
from re import template
import re
from traceback import walk_stack
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.db import models
from django.contrib.auth import authenticate
import members
from .models import Members
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserChangeForm,AuthenticationForm
from django.contrib.auth import login,logout

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

def update(request, id):
    mymember = Members.objects.get(id = id)
    template = loader.get_template("update.html")
    context = {
        'mymember': mymember
    }
    return HttpResponse(template.render(context,request))

def updaterecord(request,id):

    firstname = request.POST['first']
    lastname = request.POST['last']
    member = Members.objects.get(id=id)
    member.firstname = firstname
    member.lastname = lastname
    member.save()
    return HttpResponseRedirect(reverse('index'))

def protected_page(request):
    return render(request,'account/protected_page.html')
