from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('authenticated', views.CheckAuthenticatedView.as_view()),
    path('register', views.SignupView.as_view()),
    path('csrf_cookie', views.GetCSRFToken.as_view()),
    path('login', views.LoginView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('delete',views.DeleteAccountView.as_view()),
    path('get_users',views.GetUsersView.as_view()),
    
    path("jwt/create/", TokenObtainPairView.as_view(), name="jwt_create"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
]