from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Order
from ..serializers import OrderCreateSerializer
from rest_framework.permissions import AllowAny


class CreateOrderAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({"message": "Order created successfully", "order_id": order.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
