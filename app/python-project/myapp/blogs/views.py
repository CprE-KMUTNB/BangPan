from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse
from category.models import Category
from .models import Donation_blogs
#ใช้สำหรับแบ่งแสดงข้อมูลในหนึ่งหน้า
from django.core.paginator import Paginator,EmptyPage,InvalidPage
# Create your views here.

def index(request):
    categories = Category.objects.all()
    blog = Donation_blogs.objects.all()
    #ให้เรียง primary key จากมากไปน้อย 
    latests = Donation_blogs.objects.all().order_by('-pk')[:2]
    
    #บทความยอดนิยม
    popular = Donation_blogs.objects.all().order_by('-views')[:3]
    
    #บทความแนะนำ 
    suggestion = Donation_blogs.objects.all().order_by('views')[:3]
    
    #pagination
    paginator = Paginator(blog,3)
    try:
        page = int(request.GET.get('page','1'))
    except:
        page = 1

    try :
        blogPrepage = paginator.page(page)
    except (EmptyPage,InvalidPage):
        # ถ้าไม่มีหริอเกิน จะให้คืนหน้า : จำนวนบทความทั้งหมด/3 
        blogPrepage = paginator.page(paginator.num_pages)

    return render(request,"frontend/index.html",{'categories':categories,'blogs':blogPrepage,'latests':latests,'popular':popular,'suggestion':suggestion})

def blogDetail(request,id) :

    categories = Category.objects.all()
    #ให้เรียง primary key จากมากไปน้อย 

    #บทความยอดนิยม
    popular = Donation_blogs.objects.all().order_by('-views')[:3]

    #บทความแนะนำ 
    suggestion = Donation_blogs.objects.all().order_by('views')[:3]
    
    singleBlog = Donation_blogs.objects.get(id=id)
    singleBlog.views = singleBlog.views + 1
    singleBlog.save()
    return render(request,"frontend/blogDetail.html",{'categories':categories,'popular':popular,'Blog':singleBlog,'suggestion':suggestion})