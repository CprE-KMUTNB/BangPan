from django.urls import path
from . import views

urlpatterns = [
    path('',views.Donation_blogsListView.as_view()),
    path('featured/',views.Donation_blogsFeaturedView.as_view()),
    path('category/',views.Donation_blogsCategoryView.as_view()),
    path('detail/',views.Donation_blogsDetailView.as_view()),
    path('All_category',views.CategoryListView.as_view()),
]