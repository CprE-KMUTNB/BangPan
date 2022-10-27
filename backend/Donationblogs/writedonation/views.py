from asyncore import write
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
from blogs.models import Donation_blogs
from blogs.serializers import Donation_blogsSerializer
from .serializers import writeDonationSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import FileSystemStorage
from rest_framework.viewsets import ModelViewSet
from django.http import Http404
from django.contrib.auth import get_user_model

User=get_user_model()
# Create your views here.

class BuildeDonationView(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, format=None):

        data = request.data
        data['write'] = self.request.user.id
        serializer = writeDonationSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateDonationView(APIView):

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    permission_classes = (permissions.IsAuthenticated, )

    def put(self, request, pk, format=None):

        old = self.get_object(pk)
        data = request.data
        data['write'] = self.request.user.id
        serializer = writeDonationSerializer(old,data=data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteDonationView(APIView):

    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Donation_blogs.objects.get(id=pk)
        except Donation_blogs.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        donation_target = self.get_object(pk)
        donation_target.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)



    
