from rest_framework import serializers
from ..models.customer import Customer

class CustomerSaleSerializer(serializers.ModelSerializer): 
    total_balance = serializers.IntegerField(read_only=True)
    class Meta:
        model = Customer
        fields = ["id", "name", "mobile", "total_balance"]  # Add total_balance here