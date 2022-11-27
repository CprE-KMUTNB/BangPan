from django.urls import path
from . import views


urlpatterns = [

    path('all/',views.Donation_blogsListView.as_view()),
    path('detail/',views.Donation_blogsDetailView.as_view()),
    path('write/',views.Donation_blogsWriterView.as_view()),
    path('search/',views.SearchDonationblogView.as_view()),
    path('category/',views.CategoryDonationblogView.as_view()),
    path('report/',views.Donation_blogsReportView.as_view()),

    path('all_expire/',views.Donation_blogs_ExpireListView.as_view()),
    path('search_expire/',views.Search_ExpireDonationblogView.as_view()),

]
