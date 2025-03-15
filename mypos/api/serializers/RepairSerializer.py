from rest_framework import serializers
from ..models import Repair, Payment, Customer

class RepairSerializer(serializers.ModelSerializer):
    payment_amount = serializers.IntegerField(write_only=True, required=False)  # ✅ Optional payment field
    customer_name = serializers.CharField(write_only=True)  # ✅ Prevents inclusion in response
    mobile = serializers.CharField(write_only=True)  # ✅ Prevents inclusion in response

    class Meta:
        model = Repair
        fields = [  # ✅ Explicitly include fields, excluding `customer`
            "id", "repair_issue", "status", "note", "cost", "total_price",
            "balance",  "payment_amount", "customer_name", "mobile"
        ]

    def create(self, validated_data):
        customer_name = validated_data.pop("customer_name")  # ✅ Extract name
        mobile = validated_data.pop("mobile")  # ✅ Extract mobile
        payment_amount = validated_data.pop("payment_amount", 0)  # ✅ Extract payment amount
        total_price = validated_data.get("total_price", 0)

        # ✅ Ensure customer exists or create a new one
        customer, created = Customer.objects.get_or_create(
            mobile=mobile, 
            defaults={"name": customer_name}
        )

        # ✅ If customer exists but name is different, update the name
        if not created and customer.name != customer_name:
            customer.name = customer_name
            customer.save()

        # ✅ Assign customer to `validated_data` before creating Repair
        validated_data["customer"] = customer  # 🔥 Key Fix
        validated_data["balance"] = total_price - payment_amount

        # ✅ Create repair record
        repair = Repair.objects.create(**validated_data)

        # ✅ Create payment record if needed
        if payment_amount > 0:
            Payment.objects.create(repair=repair, amount=payment_amount)

        return repair
