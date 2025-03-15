from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from ..models import Payment, Order, Repair  # Import Repair model
from ..serializers import PaymentSerializer,RepairPaymentSerializer

class PaymentListCreateAPIView(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating payments.
    """
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def perform_create(self, serializer):
        """
        Validate the payment amount and update the associated order or repair balance.
        """
        order = serializer.validated_data.get("order", None)  # Order might be None
        repair = serializer.validated_data.get("repair", None)  # Repair might be None
        amount = serializer.validated_data["amount"]

        if order and repair:
            raise ValidationError({"error": "A payment cannot be linked to both an Order and a Repair."})

        if order:
           
            if amount > order.balance:
                raise ValidationError({"error": "Payment exceeds order balance"})

            order.balance -= amount  # Deduct from order balance
            order.save()

        elif repair:
            print(f"Repair ID: {repair.id}, Payment Amount: {amount}, Repair Balance: {repair.balance}")

            if amount > repair.balance:
                raise ValidationError({"error": "Payment exceeds repair balance"})

            repair.balance -= amount  # Deduct from repair balance
            repair.save()

        else:
            raise ValidationError({"error": "A payment must be linked to either an Order or a Repair."})

        # Save the payment record
        serializer.save()




class RepairPaymentView(generics.CreateAPIView):
    serializer_class = RepairPaymentSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({"message": "Payment recorded successfully!", "data": response.data}, status=status.HTTP_201_CREATED)
