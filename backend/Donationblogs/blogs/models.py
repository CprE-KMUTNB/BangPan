from email.policy import default
from itertools import count
from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Category(models.Model):
    
    name = models.CharField(max_length=255,unique=True) # unique=True ห้ามตั้งชื่อซ้ำ

    def __str__(self):
        return self.name

# Create your models here.
class Donation_blogs(models.Model):
    
    name = models.CharField(max_length=255)
    write = models.CharField(max_length=255)
    description =  models.TextField()
    reason = models.TextField()
    location = models.TextField()
    Amount_requested = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    image = models.ImageField(upload_to='blogImages',blank = True)
    created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField()
    category = models.ForeignKey(Category,on_delete=models.CASCADE) # ต้องลบบทความทั้งหมดก่อนจึงจะลบหมวดหมู่ได้
    featured = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        original_slug = 'db'+ slugify(self.name)
        queryset = Donation_blogs.objects.all().filter(slug__iexact=original_slug).count()

        count= 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Donation_blogs.objects.all().filter(slug__iexact=slug).count()

            #ตั้งชื่อจนกว่าจะไม่ซ้ำ

        self.slug = slug

        if self.featured:

            try:
                temp = Donation_blogs.objects.get(featured = True)
                if self != temp :
                    temp.featured = False
                    temp.save()

            except Donation_blogs.DoesNotExist:
                pass

        super(Donation_blogs,self).save(*args,**kwargs)

    def __str__(self):
        return self.name