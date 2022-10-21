from django.urls import path,include
from . import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register(r'Create',views.CreatedDonationView)


urlpatterns = [

    path('update/<int:pk>/', views.UpdateDonationView.as_view()),
    path('delete/<int:pk>/', views.DeleteDonationView.as_view()),
    path('manage-donatoin/',include(router.urls)),
    
]