from rest_framework import serializers
from ..models import Order, OrderItem, Payment

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()  # ✅ Custom method to fetch product name
    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "product_name", "quantity","price",]

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None  # ✅ Ensure you're returning the actual value