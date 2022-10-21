from cgitb import lookup
from dataclasses import dataclass
from math import perm
from unicodedata import category
from winreg import QueryInfoKey
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions,status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView
from blogs.models import Donation_blogs,Category
from blogs.serializers import Donation_blogsSerializer,CategorySerializer
from .serializers import writeDonationSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
from rest_framework.viewsets import ModelViewSet
from django.http import Http404

# Create your views here.
class CreatedDonationView(ModelViewSet):
    
    http_method_names = ['post']
    queryset =  Donation_blogs.objects.all()
    serializer_class = writeDonationSerializer
    permission_classes = (permissions.AllowAny, )

    def createDonation(self, request, *args, **kwargs):

        data = request.data
        # .save() will create a new instance.
        serializer = writeDonationSerializer(data=data)
        serializer.save()

class UpdateDonationView(APIView):

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    permission_classes = (permissions.AllowAny, )

    def put(self, request, pk, format=None):

        old = self.get_object(pk)
        print(old)
        serializer = writeDonationSerializer(old,data=request.data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteDonationView(APIView):

    permission_classes = (permissions.AllowAny, )

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        donation_target = self.get_object(pk)
        donation_target.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)

    
