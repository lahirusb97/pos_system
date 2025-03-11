from .category_views import CategoryViewSet
from .product_views import ProductViewSet
from .user_view import UserViewSet
from .register_view import register_user
from .auth_view import login_user, get_user_info,logout_user
from .customer_views import CustomerViewSet
from .order_view import OrderViewSet, OrderItemViewSet, PaymentViewSet
from .create_order_view import CreateOrderAPIView
from .order_list_view import OrderListAPIView