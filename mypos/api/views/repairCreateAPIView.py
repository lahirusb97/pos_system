from rest_framework import generics
from ..models import Repair
from ..serializers import RepairSerializer

class RepairCreateAPIView(generics.CreateAPIView):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer
