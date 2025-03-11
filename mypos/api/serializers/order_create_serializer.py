from rest_framework import serializers
from ..models import Order, OrderItem, Payment, Customer, Product

class OrderItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "product_name", "quantity", "price"]
    def get_product_name(self, obj):
        return obj.product.name if obj.product else obj.product_name

class OrderCreateSerializer(serializers.Serializer):
    customer_name = serializers.CharField()
    mobile = serializers.CharField()
    products = OrderItemSerializer(many=True)
    payment_amount = serializers.IntegerField()
    discount = serializers.IntegerField(required=False, default=0)
    def create(self, validated_data):
        # Extract customer details
        customer_name = validated_data["customer_name"]
        payment_amount = validated_data["payment_amount"]
        mobile = validated_data["mobile"]
        discount = validated_data.get("discount", 0)
        # Check if the customer exists, if not, create a new one
        customer, created = Customer.objects.get_or_create(mobile=mobile, defaults={"name": customer_name})
        # Create the order
        order = Order.objects.create(customer=customer, sub_total=0,total=0, status="pending", discount=discount,cost=0)

        total_order_amount = 0
        total_order_cost = 0

        # Add products to the order
        for item in validated_data["products"]:
            product = Product.objects.get(id=item["product_id"])
            item_cost = product.cost * item["quantity"]
            order_item = OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item["quantity"],
                price=item['price'] * item["quantity"],
            )
            total_order_amount += order_item.price
            total_order_cost += item_cost

        # Update order total
        order.sub_total = total_order_amount
        order.total = total_order_amount - order.discount
        order.balance = order.total - payment_amount  # ✅ Fix balance calculation
        order.cost = total_order_cost
        order.save()


        # Add payment to order
        Payment.objects.create(order=order, amount=validated_data["payment_amount"])

        return order
