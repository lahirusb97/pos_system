from rest_framework import generics
from ..models import Repair
from ..serializers import RepairSerializer,RepairListSerializer

class RepairCreateAPIView(generics.CreateAPIView):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer
class RepairListAPIView(generics.ListAPIView):
    queryset = Repair.objects.all()
    serializer_class = RepairListSerializer
    search_fields = ["id", "customer__name", "status", ]
    def get_queryset(self):
        queryset = Repair.objects.all()

        # Get query parameters
        repair_id = self.request.query_params.get("id", None)  # 🔥 Get Repair ID
        customer_name = self.request.query_params.get("customer_name", None)  # 🔥 Get Customer Name

        # 🔥 Filter by Repair ID (if provided)
        if repair_id:
            queryset = queryset.filter(id=repair_id)

        # 🔥 Filter by Customer Name (if provided)
        if customer_name:
            queryset = queryset.filter(customer__name__icontains=customer_name)
        
        return queryset
