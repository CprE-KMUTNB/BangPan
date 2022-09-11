from contextlib import redirect_stderr
from multiprocessing import context
from re import template
import re
from traceback import walk_stack
from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.db import models
from django.contrib.auth import authenticate
import members
from .models import Members
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserChangeForm,AuthenticationForm,UserCreationForm
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

def login_view(request):

    if request.method == 'POST' :

        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
        
    else:
        form = AuthenticationForm()

    return render(request,'account/login.html',{
        'form':form,
    })

def logout_view(request):

    if request.method == 'POST':
        logout(request)
        return HttpResponseRedirect(reverse('index'))

def signup_view(request):

    if request.method == 'POST' :

        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            return HttpResponseRedirect(reverse('index'))
        
    else:
        form = UserCreationForm()

    return render(request,'account/signup.html',{
        'form':form,
    })
