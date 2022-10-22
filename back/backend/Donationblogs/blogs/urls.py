from django.urls import path
from . import views

urlpatterns = [

    path('',views.Donation_blogsListView.as_view()),
    path('detail/',views.Donation_blogsDetailView.as_view()),
    path('category_user/',views.Donation_blogsCategoryUserView.as_view()),
    path('category_object/',views.Donation_blogsCategoryObView.as_view()),
    
]
