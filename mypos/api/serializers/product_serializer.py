from rest_framework import serializers
from ..models import Product
from .category_serializer import CategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        

    def to_representation(self, instance):
        """Customize serialization for GET requests."""
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if request and request.method == 'GET':
            representation['category'] = CategorySerializer(instance.category).data

        return representation
