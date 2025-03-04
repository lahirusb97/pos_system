from django.contrib.auth.models import Group
from rest_framework import serializers
from .models import Category, Coustomer,Product
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # Includes all model fields
class CoustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coustomer
        fields = '__all__'  # Includes all model fields
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # Includes all model fields
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "is_staff", "is_superuser"]
