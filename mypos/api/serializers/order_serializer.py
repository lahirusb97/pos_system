from rest_framework import serializers
from ..models import Order, Product, OrderProduct, Customer, Payment
from .customer_serializer import CustomerSerializer
from .payment_serializer import PaymentSerializer
from ..models import Payment

class OrderProductSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderProduct
        fields = ["product", "price", "quantity", "total_price"]  

class OrderSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True)
    customer = CustomerSerializer()
    payments = PaymentSerializer(many=True, source='order_payments')  # Use 'order_payments' to access related payments

    class Meta:
        model = Order
        fields = ["id", "order_products", "created_at", "discount", "grand_total", "customer", "payments"]
