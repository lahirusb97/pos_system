from rest_framework import serializers
from ..models import Order, OrderItem, Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class RepairPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "repair", "amount", "created_at"]
    
    def validate(self, data):
        repair = data.get("repair")
        amount = data.get("amount")

        if not repair:
            raise serializers.ValidationError("Repair is required for payment.")

        if amount <= 0:
            raise serializers.ValidationError("Payment amount must be greater than zero.")

        if amount > repair.balance:
            raise serializers.ValidationError("Payment exceeds the remaining balance.")

        return data

    def create(self, validated_data):
        repair = validated_data["repair"]
        amount = validated_data["amount"]

        # Deduct the payment amount from the repair balance
        repair.balance -= amount
        repair.save()

        return super().create(validated_data)
