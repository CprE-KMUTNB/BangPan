from django.urls import path, re_path
from django.contrib.auth.decorators import login_required

import blogs
from . import views

urlpatterns = [

    path('login/',views.index,name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('signup/add',views.signup_view,name='addUser')

]
