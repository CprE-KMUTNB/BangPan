from urllib.request import Request
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from django.contrib import auth
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from .tokens import create_jwt_pair_for_user

User=get_user_model()
# Create your views here.
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username        = data['username']
        password        = data['password']
        re_password     = data['re_password']
        # first_name      = data['first_name']
        # last_name       = data['last_name']
        # email           = data['email']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 6:
                        return Response({ 'error': 'Password must be at least 6 characters' })
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        Token.objects.create(user=user)
                        user = User.objects.get(id=user.id)
                        # , first_name=first_name, last_name=last_name, phone='',email= email,city=''
                        user_profile = UserProfile.objects.create(user=user, first_name=' ', last_name=' ', phone=' ',email= ' ',city=' ')
                        user_profile.save()

                        return Response({ 'success': 'User created successfully' })
            else:
                return Response({ 'error': 'Passwords do not match' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:

                auth.login(request, user)
                tokens = create_jwt_pair_for_user(user)
                return Response({ 'success': 'User authenticated',"token":tokens })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

    def get(self, request: Request):

        content = {"user":str(request.user),"auth":str(request.auth)}
        
        return Response(data=content,status=status.HTTP_200_OK)

class LogoutView(APIView):

    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


class DeleteAccountView(APIView):

    permission_classes = (permissions.AllowAny, )
    def delete(self, request, format=None):
        user = self.request.user

        try:
            Token.objects.filter(user=user).delete()
            User.objects.filter(id=user.id).delete()
            
            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })


class GetUsersView(APIView):

    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):

        users = User.objects.all()

        users = UserSerializer(users,many=True)
        return Response(users.data)