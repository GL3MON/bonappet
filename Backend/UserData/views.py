from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from UserData.models import Users
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

@csrf_exempt
def user_login(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"response": "Invalid JSON format"}, status=200)

    user_mail = data.get("user_mail", "")
    password = data.get("password", "")
    print(user_mail, password)
    
    # Assuming the username field is the email field
    user = authenticate(request, user_mail=user_mail, password=password)
    
    if user is not None:
        login(request, user)
        return JsonResponse({"response": "Login Success"}, status=200)
    else:
        return JsonResponse({"response": "Login Failed"}, status=200)

@csrf_exempt
def partner_register(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"response": "Invalid JSON format"}, status=400)
    employee_mail = data.get("user_mail", "")
    name = data.get("name", "")
    password = data


@csrf_exempt
def user_register(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"response": "Invalid JSON format"}, status=200)

    user_mail = data.get("user_mail", "")
    user_name = data.get("user_name", "")
    password = data.get("password", "")
    repassword = password # TODO: Change this
    phone_no = data.get("phone","")
    add = data.get("address","")
    print(data)
    if password != repassword:
        return JsonResponse({"response": "Passwords do not match"}, status=200)

    if Users.objects.filter(user_mail=user_mail).exists():
        return JsonResponse({"response": "Registration Failed, User Exists"}, status=200)

    # Create the new user
    user = Users.objects.create_user(request=request, user_mail=user_mail, user_name=user_name, password=password,phone_number = phone_no,address=add) # TODO: Change this
    user.save()

    return JsonResponse({"response": "Registration Success"}, status=200)
