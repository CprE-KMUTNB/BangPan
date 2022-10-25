from django.urls import path
from . import views

urlpatterns = [
    path('user', views.GetUserProfileView.as_view()),
    path('update',views.UpdateUserProfileView.as_view()),
]