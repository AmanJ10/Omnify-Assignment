from django.db import models
from users.models import User
from categories.models import Category

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "blogs" 

class BlogImages(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='images')
    image = models.URLField(max_length=1000)  # Storing Firebase image URL directly


    class Meta:
        db_table = "blog_images"

class BlogCategory(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='categories')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = "blog_categories"
