from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http import HttpRequest
from UserData.models import Users, DeliveryPartners

class Bon_AppetBackend(BaseBackend):
    def authenticate(self, user_mail, password):
        try:
            user = Users.objects.get(user_mail=user_mail)
            if user.check_password(password):
                return user
        except Users.DoesNotExist:
            return None

class DeliveryPartnerBackend(BaseBackend):
    def authenticate(self, employee_mail, password):
        try:
            partner  = DeliveryPartners.objects.get(employee_mail=employee_mail)
            if partner.check_password(password):
                return partner
        except DeliveryPartners.DoesNotExist:
            return None