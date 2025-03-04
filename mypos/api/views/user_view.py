from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..serializers import UserSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

