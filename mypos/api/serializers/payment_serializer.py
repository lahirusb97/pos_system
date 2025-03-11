from rest_framework import serializers
from ..models import Order, OrderItem, Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
