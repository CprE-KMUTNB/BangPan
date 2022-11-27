from cgitb import lookup
from math import perm
from unicodedata import category
from webbrowser import get
from winreg import QueryInfoKey
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from blogs.models import Category_User,Donation_blogs
from blogs.serializers import Donation_blogsSerializer
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.db.models.functions import Now
from datetime import datetime,timedelta
from django.utils import timezone
#https://django.fun/en/qa/224045/
# Create your views here.
@permission_classes((permissions.AllowAny,))
class Donation_blogsListView(APIView):
    
    serializer_class = Donation_blogsSerializer
        
    def get(self,request,format=None):

        #อายุคำขอเกินกว่าที่กำหนด
        d = timezone.now() - timedelta(minutes=30)
        print('Session 1 : ',Donation_blogs.objects.filter(created__lt=d))
        
        #อายุคำขอยังไม่เกิน how_many_days
        how_many_days = 30
        print('Session 2 : ',Donation_blogs.objects.filter(created__gte=datetime.now()-timedelta(days=how_many_days)))

        queryset = Donation_blogs.objects.filter(created__gte=datetime.now()-timedelta(days=how_many_days)).order_by('-created')
        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

@permission_classes((permissions.AllowAny,))
class Donation_blogsDetailView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny,)

    def put(self,request,format=None):

        data = self.request.data
        id_target = data['id_target']

        singleBlog = Donation_blogs.objects.get(id = id_target)
        singleBlog.views = singleBlog.views + 1
        singleBlog.save()
        queryset = Donation_blogs.objects.filter(id= id_target)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

class Donation_blogsWriterView(APIView):

    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = Donation_blogsSerializer
        
    def get(self,request,format=None):
        
        how_many_days = 30
        user = self.request.user
        queryset = Donation_blogs.objects.filter(write = user,
                    created__gte=datetime.now()-timedelta(days=how_many_days))

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

@permission_classes((permissions.AllowAny,))
class SearchDonationblogView(ListAPIView):

    how_many_days = 30
    queryset = Donation_blogs.objects.filter(created__gte=datetime.now()-timedelta(days=how_many_days))
    serializer_class = Donation_blogsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category_object','name','category_user','write__username']
    # .
    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

@permission_classes((permissions.AllowAny,))
class CategoryDonationblogView(ListAPIView):

    how_many_days = 30
    queryset = Donation_blogs.objects.filter(created__gte=datetime.now()-timedelta(days=how_many_days))
    serializer_class = Donation_blogsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category_object','category_user']



@permission_classes((permissions.AllowAny,))
class Donation_blogs_ExpireListView(APIView):
    
    serializer_class = Donation_blogsSerializer
        
    def get(self,request,format=None):

        #อายุคำขอเกินกว่าที่กำหนด
        d = timezone.now() - timedelta(days=31)
        #rint('Session 1 : ',Donation_blogs.objects.filter(created__lt=d))
        
        queryset = Donation_blogs.objects.filter(created__lt=d).order_by('-created')
        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)


@permission_classes((permissions.AllowAny,))
class Search_ExpireDonationblogView(ListAPIView):

    d = timezone.now() - timedelta(days=31)
    queryset = Donation_blogs.objects.filter(created__lt=d).order_by('-created')
    serializer_class = Donation_blogsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category_object','name','category_user','write__username']

@permission_classes((permissions.AllowAny,))
class Donation_blogsReportView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny,)

    def put(self,request,format=None):

        data = self.request.data
        id_target = data['id_target']

        singleBlog = Donation_blogs.objects.get(id = id_target)
        singleBlog.report = singleBlog.report + 1
        singleBlog.save()
        queryset = Donation_blogs.objects.filter(id= id_target)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)