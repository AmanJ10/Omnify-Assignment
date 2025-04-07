from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog, BlogImages, BlogCategory
from categories.models import Category
from .serializers import BlogSerializer
from .firebase_utils import upload_blog_image
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import transaction
from django.shortcuts import get_object_or_404


class BlogListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        # Check if query param `user_only=true` is passed
        user_only = request.query_params.get('user_only') == 'true'

        if user_only:
            if not request.user.is_authenticated:
                return Response({"detail": "Authentication required to fetch your blogs."}, status=status.HTTP_401_UNAUTHORIZED)
            blogs = Blog.objects.filter(author=request.user).order_by('-created_at')
        else:
            blogs = Blog.objects.all().order_by('-created_at')

        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)

    def post(self, request):
        title = request.data.get("title")
        content = request.data.get("content")
        category_ids = request.data.get("categories", [])
        image_urls = request.data.get("images", [])  # ✅ Expect URLs

        try:
            with transaction.atomic():
                blog = Blog.objects.create(
                    title=title,
                    content=content,
                    author=request.user
                )

                for cat_id in category_ids:
                    category = Category.objects.get(id=cat_id)
                    BlogCategory.objects.create(blog=blog, category=category)

                for image_url in image_urls:
                    BlogImages.objects.create(blog=blog, image=image_url)

                serializer = BlogSerializer(blog)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BlogDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, id):
        return get_object_or_404(Blog, id=id)

    def get(self, request, id):
        blog = self.get_object(id)
        serializer = BlogSerializer(blog)
        return Response(serializer.data)

    def put(self, request, id):
        blog = self.get_object(id)

        if blog.author != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        title = request.data.get("title", blog.title)
        content = request.data.get("content", blog.content)
        category_ids = request.data.get("categories", [])
        image_urls = request.data.get("images", [])

        try:
            with transaction.atomic():
                blog.title = title
                blog.content = content
                blog.save()

                # ✅ Update categories
                blog.categories.all().delete()
                for cat_id in category_ids:
                    category = Category.objects.get(id=cat_id)
                    BlogCategory.objects.create(blog=blog, category=category)

                # ✅ Update images
                blog.images.all().delete()
                for image_url in image_urls:
                    BlogImages.objects.create(blog=blog, image=image_url)

                serializer = BlogSerializer(blog)
                return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        blog = self.get_object(id)

        if blog.author != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)

        blog.delete()
        return Response({"message": "Blog deleted successfully."}, status=status.HTTP_204_NO_CONTENT)