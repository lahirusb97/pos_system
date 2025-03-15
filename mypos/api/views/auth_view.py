from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework import status


class LoginView(APIView):
    permission_classes = [AllowAny]  # 🔓 Allow anyone to log in

    def post(self, request):
        """Authenticate user and return token."""
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)  # 🔥 Get or create user token
            return Response({
                "message": "Login successful",
                "token": token.key,  # ✅ Return authentication token
                "username": user.username,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            })
        else:
            return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)
