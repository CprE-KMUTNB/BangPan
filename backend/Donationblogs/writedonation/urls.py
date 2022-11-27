from django.urls import path,include
from . import views
from rest_framework import routers

#<str: ชื่อเลย >

urlpatterns = [

    path('update/<int:pk>/', views.UpdateDonationView.as_view()),
    path('delete/<int:pk>/', views.DeleteDonationView.as_view()),
    path('build/', views.BuildeDonationView.as_view()),
    path('adminn/', views.ClearexpiredView.as_view()),
    path('adminn/delete/<int:pk>/', views.DeletetagetexpiredView.as_view()),
    path('adminn/clear_all/', views.DeleteallexpiredView.as_view()),
    path('detail_view/', views.SearchDonationblogwriterView.as_view()),    
]