from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import MinLengthValidator, MaxLengthValidator 

class BAUserManager(BaseUserManager):
    @method_decorator(csrf_exempt)
    def create_user(self, user_mail, password=None):
        if not user_mail:
            raise ValueError('Email is required!')
        if not password:
            raise ValueError('Password is required.')
        user_mail = self.normalize_email(user_mail)
        user = self.model(user_mail = user_mail)
        user.set_password(password)
        user.save()
        return user

class Users(AbstractBaseUser, PermissionsMixin):
    user_pid = models.CharField(default="BA4") #The prefix of userID
    user_id_suf = models.AutoField(primary_key=True) #Suffix (USER_ID=BA40000, BA40001 and so on..)
    user_name = models.CharField(max_length=75, blank=False) 
    user_mail = models.EmailField(max_length=45, unique=True,blank=False) 
    phone_number = models.BigIntegerField(validators=[MaxLengthValidator(10)], blank=False)
    address = models.CharField(max_length=450, blank=False)
    password = models.CharField(max_length=200, validators=[MinLengthValidator(8)], blank=False) #Giving it a min & max length limit
    
    objects = BAUserManager()
    USERNAME_FIELD = 'user_mail'

    def __str__(self):
        return f"{self.user_pid}{self.user_id_suf}"
    def welcome_message(self):
        return f"Glad to have you on board, {self.user_pid}{self.user_id_suf}! Share your cravings with us."
    
class DeliveryPartners(models.Model):
    Employee_pid = models.CharField(default="BAdp2")
    Employee_id_suf = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45, blank=False)
    phone_number = models.BigIntegerField(validators=[MaxLengthValidator(10)], blank=False)
    vehicle_model = models.CharField(max_length=50)
    license_number = models.CharField(max_length=15)
    vehicle_id = models.CharField(max_length=10, blank=False)

    
@receiver(post_save, sender=Users)
def send_message(sender, instance, created, **kwargs):
        if created:
            print(instance.welcome_message())