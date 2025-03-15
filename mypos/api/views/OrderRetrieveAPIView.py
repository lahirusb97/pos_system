from rest_framework.generics import RetrieveDestroyAPIView
from rest_framework.permissions import IsAdminUser
from ..models import Order
from ..serializers import OrderSerializer

class OrderRetrieveAPIView(RetrieveDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    # To get a single order by its ID
    lookup_field = "id"  # This means we will lookup the order by the 'id' field
    def get_permissions(self):
        if self.request.method == "DELETE":
            return [IsAdminUser()]  # Only admin users can delete
        return super().get_permissions()