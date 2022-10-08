from django.urls import path
from . import views

urlpatterns =[
    path('',views.index,name='index_blogs'),
    path('blog/<int:id>',views.blogDetail,name ='blogDetail'),
    path('blog/category/<int:category_id>',views.searchCategory,name="searchCategory"),
    path('blog/writer/<str:writer>',views.searchWriter,name='searchWriter'),
]