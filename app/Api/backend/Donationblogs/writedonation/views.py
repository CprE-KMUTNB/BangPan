from cgitb import lookup
from math import perm
from unicodedata import category
from winreg import QueryInfoKey
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from blogs.models import Donation_blogs,Category
from blogs.serializers import Donation_blogsSerializer,CategorySerializer
from .serializers import CreateDonationSerializer
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

class CreateDonationView(APIView):

    serializer_class = CreateDonationSerializer
    queryset = Donation_blogs.objects.all()
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data=request.data
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        
        
        if serializer.is_valid():
            name = data['name']
            write = data['write']
            reason = data['reason']
            description = data['description']
            location = data['location']
            Amount_requested = data['Amount_requested']
            image = data['image']
            category = data['category']

            #,image=img_url
            donation_blog = Donation_blogs(name = name,write=write,description=description
            ,reason=reason,location=location
            ,Amount_requested=Amount_requested
            ,category_id=category
            ,image = image)

            donation_blog.save()
        
        return Response(Donation_blogsSerializer(donation_blog).data,status.HTTP_200_OK)

class UpdateDonationView(APIView):

    serializer_class = CreateDonationSerializer
    queryset = Donation_blogs.objects.all()
    permission_classes = (permissions.AllowAny, )

    def post(self,request,format=None):
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data=request.data
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        
        
        if serializer.is_valid():
            name = data['name']
            write = data['write']
            reason = data['reason']
            description = data['description']
            location = data['location']
            Amount_requested = data['Amount_requested']
            image = data['image']
            category = data['category']

            #,image=img_url
            donation_blog = Donation_blogs(name = name,write=write,description=description
            ,reason=reason,location=location
            ,Amount_requested=Amount_requested
            ,category_id=category
            ,image = image)

            donation_blog.save()
        
        return Response(Donation_blogsSerializer(donation_blog).data,status.HTTP_200_OK)

