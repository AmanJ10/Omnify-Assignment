from django.urls import path
from .views import RegisterView, LoginView, LogoutView, GetUserView, CSRFTokenView

urlpatterns = [
    path("csrf/", CSRFTokenView.as_view(), name="csrf-token"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("user/", GetUserView.as_view(), name="get-user"),
]