from rest_framework import serializers
from ..models import Category

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(read_only=True)  # Use pre-annotated field

    class Meta:
        model = Category
        fields = ["id", "name", "product_count"]
