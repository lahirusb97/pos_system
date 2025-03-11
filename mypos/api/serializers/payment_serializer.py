from rest_framework import serializers
from ..models import Payment, OrderPayment, Order

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "amount", "created_at"]

class OrderPaymentSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer()  # Corrected definition
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())  # Reference to Order

    class Meta:
        model = OrderPayment
        fields = ["payment", "order"]

class PaymentWithOrdersSerializer(serializers.ModelSerializer):
    # Use 'many=True' since one payment can relate to multiple orders
    order_payments = OrderPaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Payment
        fields = ["id", "amount", "created_at", "order_payments"]
