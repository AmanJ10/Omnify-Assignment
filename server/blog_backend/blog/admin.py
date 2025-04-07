from django.contrib import admin
from .models import Blog, BlogImages, BlogCategory
# Register your models here.
admin.site.register(Blog)
admin.site.register(BlogImages)
admin.site.register(BlogCategory)