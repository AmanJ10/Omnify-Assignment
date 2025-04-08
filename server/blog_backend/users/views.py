from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenView(APIView):
    def get(self, request):
        return JsonResponse({"csrfToken": get_token(request)})


class RegisterView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')

        if not name or not email or not password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email=email, name=name, password=password)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(password, user.password):
            return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)

        tokens = get_tokens_for_user(user)

        response = Response({"message": "Login successful", "user": {"email": user.email, "name":user.name}})
        response.set_cookie(
            key="access_token",
            value=tokens["access"],
            httponly=True,
            secure=True, 
            samesite="None",
            max_age=60 * 60 * 24 * 7,
        )

        return response  


class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        return response

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed

class GetUserView(APIView):
    def get(self, request):
        token = request.COOKIES.get("access_token")  
        if not token:
            raise AuthenticationFailed("Unauthorized") 

        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)  
        user = jwt_auth.get_user(validated_token)  

        return Response({"user": {"email": user.email, "name":user.name}}, status=status.HTTP_200_OK)
