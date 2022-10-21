from unicodedata import category
from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Donation_blogs,Category
# Register your models here.

# Apply summernote to all TextField in model.

class Donation_blogsAdmin(SummernoteModelAdmin):  # instead of ModelAdmin
    #exclude = ('slug',)
    """
    list_display = ('id','name','category','created','write')
    list_display_link = ('id','name','write')
    search_fields = ('name','write')
    list_per_page = 25
    """
    summernote_fields = ('reason','location')

admin.site.register(Donation_blogs,Donation_blogsAdmin)

#admin.site.register(Donation_blogs)

admin.site.register(Category)