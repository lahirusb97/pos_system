from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import Repair
from ..serializers import RepairSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..serializers import RepairListSerializer,RepairUpdateSerializer
class RepairViewSet(viewsets.ModelViewSet):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer

class RepairRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Repair.objects.all()
    serializer_class = RepairUpdateSerializer
    lookup_field = "id"  # ✅ Lookup by `id`
    permission_classes = [IsAuthenticated]  # ✅ Require authentication

    def delete(self, request, *args, **kwargs):
        """Allow only admins to delete."""
        if not request.user.is_superuser:
            return Response(
                {"error": "Only admin users can delete repairs."},
                status=status.HTTP_403_FORBIDDEN,
            )

        repair = get_object_or_404(Repair, id=kwargs["id"])
        repair.delete()
        return Response({"message": "Repair deleted successfully"}, status=status.HTTP_204_NO_CONTENT)