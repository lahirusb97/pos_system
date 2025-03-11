"""
URL configuration for mypos project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'category', views.CategoryViewSet)  # This will create API routes for Category
router.register(r'customer', views.CustomerViewSet)  # This will create API routes for Category
router.register(r'products', views.ProductViewSet)  # This will create API routes for Category
router.register(r'users', views.UserViewSet)


urlpatterns = [
     path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", views.register_user, name="register"),
    path("login/", views.login_user, name="login"),
    path("user/", views.get_user_info, name="login"),
    path("logout/", views.logout_user, name="login"),
    path('orders/', views.CreateOrderView.as_view(), name='create_order'),
    # path('orders/<int:order_id>/', views.CreateOrderView.as_view(), name='make_payment'),
]


