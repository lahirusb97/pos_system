from rest_framework.generics import ListAPIView
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Order
from ..serializers import OrderSerializer

class OrderListAPIView(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # ✅ Enable filtering and searching
    filter_backends = [DjangoFilterBackend, SearchFilter]
    
    # ✅ Filtering fields
    filterset_fields = ["status", "customer__mobile","id"]
