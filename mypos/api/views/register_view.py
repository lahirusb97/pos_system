from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        # Validation checks
        if not username or not password:
            return JsonResponse({"error": "Username and password are required"}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken"}, status=400)

        # Create the user
        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({"message": "User registered successfully!"}, status=201)
