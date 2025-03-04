from rest_framework import viewsets
from ..models import Coustomer
from ..serializers import CoustomerSerializer

class CoustomerViewSet(viewsets.ModelViewSet):
    queryset = Coustomer.objects.all()
    serializer_class = CoustomerSerializer
