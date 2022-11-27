from asyncore import write
from cgitb import lookup
from dataclasses import dataclass
from email.mime import image
from math import perm
from unicodedata import category
from winreg import QueryInfoKey
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView
from blogs.models import Donation_blogs
from blogs.serializers import Donation_blogsSerializer
from .serializers import writeDonationSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
from rest_framework.viewsets import ModelViewSet
from django.http import Http404
from django.contrib.auth import get_user_model
from datetime import datetime,timedelta
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
User=get_user_model()
# Create your views here.

class BuildeDonationView(APIView):

    permission_classes = (permissions.IsAuthenticated, )
    
    def post(self, request, format=None):
    
        data = request.data
        print(data)
        data['write'] = self.request.user.id
        serializer = writeDonationSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response({ 'error': 'You do not have the right to delete this donation request.' }, status=status.HTTP_400_BAD_REQUEST)
    
            

class UpdateDonationView(APIView):

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    permission_classes = (permissions.IsAuthenticated, )

    def put(self, request, pk, format=None):

        try :
            old = self.get_object(pk)
            data = request.data
            print(data)
            data['write'] = self.request.user.id
        
        
            if old.write == self.request.user :

                if request.FILES['image']:

                    datafile = request.FILES['image']

                    if str(datafile.content_type).startswith('image') :
                                
                        #ลบรูปภาพ
                        fs = FileSystemStorage()

                        fs.delete(str(old.image))

                serializer = writeDonationSerializer(old,data=data)
                    
                if serializer.is_valid():

                    serializer.save()

                    return Response(serializer.data)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            else :
            
                return Response({ 'error': 'You do not have the right to Update this donation request.' })
                
        except AttributeError :

                return Response({ 'error': 'โปรดป้อนรูปภาพใหม่' })

class DeleteDonationView(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        donation_target = self.get_object(pk)

        if donation_target.write == self.request.user :
            fs = FileSystemStorage()
            fs.delete(str(donation_target.image))
            print(str(donation_target.image))
            donation_target.delete()
        
            return Response(status=status.HTTP_204_NO_CONTENT)

        else :
            
            return Response({ 'error': 'You do not have the right to delete this donation request.' })

@permission_classes((permissions.IsAuthenticated,))
class SearchDonationblogwriterView(ListAPIView):

    how_many_days = 30
    queryset = Donation_blogs.objects.filter(created__gte=datetime.now()-timedelta(days=how_many_days))
    serializer_class = Donation_blogsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id']
    # .
    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

    
#-----------------------------------------------------------------------------------------------------------------------------------------------------
class ClearexpiredView(APIView):

    permission_classes = (permissions.IsAdminUser, )

    def get(self, request, format=None):

        #อายุคำขอเกินกว่าที่กำหนด
        d = timezone.now() - timedelta(days=30)
        print('Session 1 : ',Donation_blogs.objects.filter(created__lt=d))

        queryset = Donation_blogs.objects.filter(created__lt=d).order_by('-created')

        if queryset :

            serializer = Donation_blogsSerializer(queryset, many=True)

            return Response(serializer.data)

        else :
            
            return Response({ 'No': 'All clear' })

class DeletetagetexpiredView(APIView):

    permission_classes = (permissions.IsAdminUser, )


    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):

        donation_target = self.get_object(pk)
        fs = FileSystemStorage()
        fs.delete(str(donation_target.image))
        print(str(donation_target.image))
        donation_target.delete()
    
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeleteallexpiredView(APIView):

    permission_classes = (permissions.IsAdminUser, )

    def delete(self, request,format=None):

        d = timezone.now() - timedelta(days=20)
        chest = Donation_blogs.objects.filter(created__lt=d)

        for i in chest:
            
            fs = FileSystemStorage()
            fs.delete(str(i.image))
            print(str(i.image))
            i.delete()
    
        return Response({ 'Complete': '  All clear ' })