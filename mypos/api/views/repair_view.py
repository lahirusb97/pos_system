from rest_framework import viewsets
from ..models import Repair
from ..serializers import RepairSerializer

class RepairViewSet(viewsets.ModelViewSet):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer
