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


router = routers.DefaultRouter()
router.register(r'category', views.CategoryViewSet)  # This will create API routes for Category
router.register(r'customer', views.CustomerViewSet)  # This will create API routes for Category
router.register(r'products', views.ProductViewSet)  # This will create API routes for Category
# router.register(r'users', views.UserViewSet)
# router.register(r'orders', views.OrderViewSet)
# router.register(r'order-items', views.OrderItemViewSet)
# router.register(r'payments', views.PaymentViewSet)

urlpatterns = [
     path('', include(router.urls)),
    path("register/", views.register_user, name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
   path("orders/create/", views.CreateOrderAPIView.as_view(), name="order-create"),
   path("orders/", views.OrderListAPIView.as_view(), name="order-list"),
   path("orders/<int:id>/", views.OrderRetrieveAPIView.as_view(), name="order-detail"),  # New path for single order
   path("payments/", views.PaymentListCreateAPIView.as_view(), name="payment-list"),
   path("repairs/", views.RepairCreateAPIView.as_view(), name="repair-create"),
   path("repair/<int:id>/", views.RepairRetrieveUpdateDeleteAPIView.as_view(), name="repair-create"),
   path("repairs_list/", views.RepairListAPIView.as_view(), name="repair-get"),
   path("customers/", views.CustomerSalesViewSet.as_view(), name="repair-get"),
   path("repairs/payment/", views.RepairPaymentView.as_view(), name="repair-payment"),
]


