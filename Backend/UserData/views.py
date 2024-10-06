from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout, get_user
from django.http import JsonResponse
import json

@csrf_exempt
def user_login(request):
    data = json.loads(request.body.decode("utf-8"))
    print(data)
    user_mail = data.get("user_mail", "")
    password = data.get("password", "")
    user = authenticate(user_mail=user_mail, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({"response":"Login Success"},status=200)
    else:
        return JsonResponse({"response":"Login Failed"},status=400)
