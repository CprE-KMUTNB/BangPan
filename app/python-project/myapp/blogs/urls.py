from django.urls import path
from . import views

urlpatterns =[
    path('',views.index,name='index_blogs'),
    path('blog/<int:id>',views.blogDetail,name ='blogDetail'),
]