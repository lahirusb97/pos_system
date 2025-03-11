from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db import transaction
from ..models import Order, OrderProduct, Product, Customer, Payment, OrderPayment
from ..serializers import OrderSerializer  # Ensure you have this serializer imported
from rest_framework.permissions import AllowAny

class CreateOrderView(APIView):
    permission_classes = [AllowAny]  # Adjust permissions if necessary

    def post(self, request, *args, **kwargs):
        """
        Create an order with multiple products and process payment.
        """
        try:
            customer_id = request.data.get('customer_id')
            products = request.data.get('products')  # List of {product_id, quantity}
            discount = request.data.get('discount', 0)
            amount_paid = request.data.get('amount_paid')  # Assume this field contains the payment amount

            # Validate customer
            customer = Customer.objects.get(id=customer_id)

            # Create order
            order = Order.objects.create(customer=customer, discount=discount,)

            total_price = 0
            with transaction.atomic():  # Ensure all products are added or none at all
                for item in products:
                    product = Product.objects.get(id=item['product_id'])
                    quantity = item['quantity']

                    # Check stock
                    if product.qty < quantity:
                        return Response({'error': f"Not enough stock for {product.name}"}, status=400)

                    product.qty -= quantity  # Reduce stock
                    product.save()

                    order_product = OrderProduct.objects.create(
                        order=order, product=product, quantity=quantity, price=product.normal_price
                    )
                    total_price += order_product.total_price()

                # Update order total
                order.grand_total = total_price - discount
                order.save()

            # Create a payment for the order
            if amount_paid > order.grand_total:
                return Response({'error': 'Insufficient payment amount'}, status=400)

            payment = Payment.objects.create(customer=customer, amount=amount_paid)

            # Create the OrderPayment to link the order and payment
            OrderPayment.objects.create(order=order, payment=payment)

            # Serialize the order and return the response
            order_data = OrderSerializer(order).data  # Return the serialized order with payment info

            return Response({
                'message': 'Order created and payment processed successfully', 
                'order_id': order.id,
                'payment_id': payment.id,
                'order_data': order_data
            }, status=201)

        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=400)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    def get(self, request, *args, **kwargs):
        """
        Retrieve all orders.
        """
        try:
            orders = Order.objects.all()  # Fetch all orders from the database
            # Serialize the orders
            orders_data = OrderSerializer(orders, many=True).data  # `many=True` because we're fetching a list of orders
            return Response(orders_data)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
