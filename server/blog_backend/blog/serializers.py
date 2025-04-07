from rest_framework import serializers
from .models import Blog, BlogImages, BlogCategory
from categories.models import Category
from users.models import User


class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImages
        fields = ['image']


class BlogCategorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = BlogCategory
        fields = ['category', 'category_name']


class BlogSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'author_name', 'created_at', 'images', 'categories']

    def get_images(self, obj):
        # ✅ Return list of image URLs
        return [img.image for img in BlogImages.objects.filter(blog=obj)]

    def get_categories(self, obj):
        # ✅ Return list of categories with id and name
        return BlogCategorySerializer(BlogCategory.objects.filter(blog=obj), many=True).data

