from rest_framework import serializers
from ..models import Order
from .orderItem_serializer import OrderItemSerializer
from .payment_serializer import PaymentSerializer
from .customer_serializer import CustomerSerializer
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True,)
    payments = PaymentSerializer(many=True, read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ["id", "customer", "total", "status", "discount", "items", "payments", "balance", "cost","created_at","sub_total"]
