from cgitb import lookup
from math import perm
from unicodedata import category
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

# Create your views here.
@permission_classes((permissions.AllowAny,))
class Donation_blogsListView(APIView):
 
    serializer_class = Donation_blogsSerializer
        
    def get(self,request,format=None):

        queryset = Donation_blogs.objects.order_by('-created')
        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

class Donation_blogsDetailView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny,)

    def put(self,request,format=None):

        data = self.request.data
        id_target = data['id_target']

        singleBlog = Donation_blogs.objects.get(id = id_target)
        singleBlog.views = singleBlog.views + 1
        singleBlog.save()
        queryset = Donation_blogs.objects.order_by('-created').filter(id= id_target)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

class Donation_blogsCategoryUserView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):

        data = self.request.data
        category_u = data['category_target']

        queryset = Donation_blogs.objects.order_by('-created').filter(category_user= category_u)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

class Donation_blogsCategoryObView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):

        data = self.request.data
        category_o = data['category_target']

        queryset = Donation_blogs.objects.order_by('-created').filter(category_object= category_o)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

class Donation_blogsCategory2conView(APIView):

    serializer_class = Donation_blogsSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):

        data = self.request.data
        category_o = data['categoryO_target']
        category_u = data['categoryU_target']

        queryset = Donation_blogs.objects.order_by('-created').filter(category_object= category_o, category_user =category_u)

        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)


class Donation_blogsWriterView(APIView):

    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = Donation_blogsSerializer
        
    def get(self,request,format=None):
        
        user = self.request.user
        queryset = Donation_blogs.objects.order_by('-created').filter(write = user)
        serializer = Donation_blogsSerializer(queryset, many=True)

        return Response(serializer.data)

@permission_classes((permissions.AllowAny,))
class SearchDonationblogView(APIView):

    queryset = Donation_blogs.objects.all()
    serializer_class = Donation_blogsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['=category_object']


