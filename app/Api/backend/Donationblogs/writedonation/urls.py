from django.urls import path
from . import views

urlpatterns = [
    path('create-donatoin/',views.CreateDonationView.as_view()),
    path('update-donatoin/',views.UpdateDonationView.as_view()),
]