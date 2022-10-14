from csv import writer
from dataclasses import dataclass
from email.mime import image
import imp
from importlib.resources import path
from pydoc import describe
import re
from django.shortcuts import redirect, render
from blogs.models import Donation_blogs
from django.db.models import Sum 
import ctypes
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserChangeForm,AuthenticationForm,UserCreationForm
from django.contrib.auth import login,logout
from django.contrib.auth.models import auth
from category.models import Category
from django.core.files.storage import FileSystemStorage
from django.contrib import messages

# Create your views here.
@login_required(login_url='login')
def panel(request):

    writer = auth.get_user(request)
    blogs = Donation_blogs.objects.filter(write=writer)
    total = Donation_blogs.objects.filter(write=writer).aggregate(Sum("views")) 
    blogCount = blogs.count()

    return render(request,"backend/index.html",{"blogs":blogs,"writer":writer,'blogCount':blogCount
    ,'total':total })

def displayForm(request):

    writer = auth.get_user(request)
    blogs = Donation_blogs.objects.filter(write=writer)
    total = Donation_blogs.objects.filter(write=writer).aggregate(Sum("views")) 
    blogCount = blogs.count()

    rise = Category.objects.all()

    return render(request,"backend/DonationFrom.html",{"blogs":blogs,"writer":writer,'blogCount':blogCount
    ,'total':total,'categoryes':rise})

def insertData(request):
    
    if request.method == "POST" and request.FILES['image'] :

        datafile = request.FILES['image']
        # รับค่าจากฟอร์ม
        writer = auth.get_user(request)
        description = request.POST['description']
        name = request.POST['name']
        reason = request.POST['reason']
        location = request.POST['location']
        Amount_requested = request.POST['Amount_requested']
        category = request.POST['category']

        #ต้องเพิ่มห้ามว่างฆ
        if str(datafile.content_type).startswith('image') :

            fs    = FileSystemStorage()

            #อัพโหลด
            filename = fs.save("blogImages/"+datafile.name,datafile) 
            img_url = "blogImages/"+datafile.name
            messages.info(request,"อัพโหลดสำเร็จ")
            #บันทึกข้อมูลบทความ
            donation_blog = Donation_blogs(name = name,write=writer,description=description,reason=reason,location=location,Amount_requested=Amount_requested,image=img_url,category_id=category)
            donation_blog.save()
            messages.info(request,"บันทึกข้อมูลเรียบร้อย")
            return redirect("displayForm")

        else :
            
            messages.info(request,"ไฟล์ที่อัพโหลดไม่รองรับ กรุณาอัพโหลดไฟล์รูปภาพอีกครั้ง")
            return redirect("displayForm")
   
def deleteData(request,id):
    
    blog = Donation_blogs.objects.get(id=id)
    fs = FileSystemStorage()
    fs.delete(str(blog.image))

    blog.delete()

    return redirect('index_panel')

def editiData(request,id):
    
    writer = auth.get_user(request)
    blogs = Donation_blogs.objects.filter(write=writer)
    total = Donation_blogs.objects.filter(write=writer).aggregate(Sum("views")) 
    blogCount = blogs.count()
    rise = Category.objects.all()

    blogEdit = Donation_blogs.objects.get(id=id)

    return render(request,'backend/editDonationForm.html',{"blogEdit":blogEdit,"writer":writer,'blogCount':blogCount
    ,'total':total,'categoryes':rise})

def updateData(request,id):

    try :
        if request.method == "POST" :

            # ข้อมูลเดิม
            blog = Donation_blogs.objects.get(id=id)
            # รับค่าจากฟอร์ม
            description = request.POST['description']
            name = request.POST['name']
            reason = request.POST['reason']
            location = request.POST['location']
            Amount_requested = request.POST['Amount_requested']
            category = request.POST['category']

            # อัปเดตข้อมูล
            blog.name = name
            blog.category_id = category
            blog.description = description
            blog.reason = reason
            blog.location = location
            blog.Amount_requested = Amount_requested

            # อัปเดตภาพปก 
            if request.FILES['image']:
                datafile = request.FILES['image']

                if str(datafile.content_type).startswith('image') :
                    
                    #ลบรูปภาพ
                    fs = FileSystemStorage()
                    fs.delete(str(blog.image))

                    #แทนที่ภาพใหม่
                    filename = fs.save("blogImages/"+datafile.name,datafile) 
                    img_url = "blogImages/"+datafile.name

                    blog.image = img_url

            blog.save()

            messages.info(request,"อัปเดตเรียบร้อย")
            return redirect('index_panel')  

    except :
        return redirect('index_panel')