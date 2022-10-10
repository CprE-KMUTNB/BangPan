from contextlib import redirect_stderr
import email
from multiprocessing import context
from re import template
import re
from traceback import walk_stack
from urllib.request import Request
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
from django.contrib import messages
from django.contrib.auth.models import User #ตาราง auth_User 

# Create your views here.
def index(request):

    if request.method == 'POST' :

        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)

        if user is not None:
            login(request,user)
            return redirect('index_panel')
        
        else :
            
            messages.info(request,"ไม่พบข้อมูลบัญชีผู้ใช้งาน")
            return redirect('login')
            
    return render(request,'backend/login_register.html')

def logout_view(request):

    logout(request)
    return redirect('login')

def signup_view(request):

    if request.method == 'POST' :

        username = request.POST['username']
        password = request.POST['password'] # มาจาก name ใน input ของ login_register.html
        repassword = request.POST['repassword']
        email    = request.POST['email']

        if username == '' or password == '' or repassword =='' or email =='' :
            messages.info(request,"กรุณาป้อนข้อมูลให้ครบ")
            return redirect("login")

        else:

            if password == repassword :

                if User.objects.filter(username=username).exists():
                    messages.info(request,"Username นี้มีคนใช้แล้ว")
                    return redirect("login")

                elif User.objects.filter(email=email).exists():
                    messages.info(request,"email นี้เคยลงทะเบียนแล้ว")
                    return redirect("login")

                else:

                    user = User.objects.create_user(
                    username = username,
                    email = email,
                    password = password
                    )
                    user.save()
                    messages.info(request,"สร้างบัญชีเรียบร้อย")
                    return redirect("login")
            
            messages.info(request,"ไม่สามารถลงทะเบียนได้รหัสผ่านไม่ตรงกัน")
            return redirect('login')

    return render(request,'backend/login_register.html')
