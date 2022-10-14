from django.urls import path
from . import views

urlpatterns = [
    path('',views.panel,name="index_panel"),
    path('displayForm/',views.displayForm,name="displayForm"),
    path('insertData/',views.insertData,name='insertData'),
   #สาเหตุที่ใช้ id เนื่องจาก colum อื่นๆซ้ำกันได้
    path('deleteData/<int:id>',views.deleteData,name="deleteData"),
    path('editiData/<int:id>',views.editiData,name='editiData'),
    path('updateData/<int:id>',views.updateData,name='updateData'),
]