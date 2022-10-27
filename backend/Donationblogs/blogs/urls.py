from django.urls import path
from . import views

urlpatterns = [

    path('all/',views.Donation_blogsListView.as_view()),
    path('detail/',views.Donation_blogsDetailView.as_view()),
    path('category_user/',views.Donation_blogsCategoryUserView.as_view()),
    path('category_object/',views.Donation_blogsCategoryObView.as_view()),
    path('write/',views.Donation_blogsWriterView.as_view()),
    path('2condition/',views.Donation_blogsCategory2conView.as_view()),
    path('Search',views.SearchDonationblogView.as_view()),
    
]
