from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

@csrf_exempt
def user_login(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"response": "Invalid JSON format"}, status=400)

    user_mail = data.get("user_mail", "")
    password = data.get("password", "")
    
    # Assuming the username field is the email field
    user = authenticate(request, username=user_mail, password=password)
    
    if user is not None:
        login(request, user)
        return JsonResponse({"response": "Login Success"}, status=200)
    else:
        return JsonResponse({"response": "Login Failed"}, status=400)

@csrf_exempt
def user_register(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"response": "Invalid JSON format"}, status=400)

    user_mail = data.get("user_mail", "")
    user_name = data.get("user_name", "")
    password = data.get("password", "")
    repassword = data.get("repassword", "")
    phone_no = data.get("phone number","")
    add = data.get("Address","")

    if password != repassword:
        return JsonResponse({"response": "Passwords do not match"}, status=400)

    if User.objects.filter(username=user_mail).exists():
        return JsonResponse({"response": "Registration Failed, User Exists"}, status=400)

    # Create the new user
    user = Users.objects.create_user(username=user_mail, email=user_name, password=password,phone_number = phone_no,address=add)
    user.save()

    return JsonResponse({"response": "Registration Success"}, status=200)
