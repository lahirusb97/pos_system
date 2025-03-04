from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = JsonResponse({"message": "Login successful!"}, status=200)
            response = JsonResponse({
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "role": "admin" if user.is_superuser else "user",  # Example role check
                    
                }, status=200)
            # Set HTTP-Only Cookies
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,  # Prevents JavaScript access
                secure=True,  # Only send over HTTPS
                samesite="Lax",  # Prevents CSRF (can also use 'Strict' or 'None' for cross-origin)
                max_age=60 * 15,  # 15 minutes (same as access token expiration)
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="Lax",
                max_age=60 * 60 * 24 * 7,  # 7 days (same as refresh token expiration)
            )

            return response
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
from django.views.decorators.csrf import csrf_exempt

# Get user info & auth
@csrf_exempt
def get_user_info(request):
    """Fetch user info using access token from cookies."""
    access_token = request.COOKIES.get("access_token")

    if not access_token:
        return JsonResponse({"error": "No access token, please log in"}, status=401)

    try:
        token = AccessToken(access_token)  # Decode token
        user_id = token["user_id"]
        user = User.objects.get(id=user_id)

        return JsonResponse({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": "admin" if user.is_superuser else "user",
            
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": "expired authontication"}, status=401)


@csrf_exempt
def logout_user(request):
    """Logout user by clearing cookies."""
    response = JsonResponse({"message": "Logout successful"}, status=200)

    # Delete cookies
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return response
