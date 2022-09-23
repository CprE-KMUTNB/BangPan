from django.urls import path, re_path
from django.contrib.auth.decorators import login_required

import blogs
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    #path('add/',views.add,name='add'),
    path('add/',views.add,name='add'),
    path('add/addrecord/',views.addrecord,name='addrecord'),
    path('delete/<int:id>',views.delete,name='delete'),
    path('update/<int:id>', views.update, name='update'),
    path('update/updaterecord/<int:id>', views.updaterecord, name='updaterecord'),
    path('login/',views.login_view,name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('signup/',views.signup_view,name='signup'),

]
