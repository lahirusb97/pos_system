from rest_framework import viewsets,filters
from ..models import Product
from ..serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # Enables search by 'name'
    permission_classes = [IsAuthenticated]