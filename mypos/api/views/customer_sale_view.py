from rest_framework import viewsets
from ..models import Customer
from ..serializers import CustomerSaleSerializer
from rest_framework import generics
from django.db.models import Sum,Q
class CustomerSalesViewSet(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSaleSerializer
    def get_queryset(self):
        return Customer.objects.annotate(
            total_order_balance=Sum("order__balance", default=0),
            total_repair_balance=Sum("repair__balance", default=0),
            total_balance=Sum("order__balance", default=0) + Sum("repair__balance", default=0),
        )
    search_fields = ['name', 'mobile']  # Enables search by 'name'
