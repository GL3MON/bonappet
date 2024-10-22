from django.urls import path
from .views import user_login
from .views import user_register, partner_register
urlpatterns = [
    path("login/", user_login),
    path("register/", user_register),
    path("staffregister/", partner_register),
]