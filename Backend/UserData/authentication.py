from django.contrib.auth.backends import BaseBackend
from UserData.models import Users

class Bon_AppetBackend(BaseBackend):
    def authenticate(self, user_mail, password):
        try:
            user = Users.objects.get(user_mail=user_mail)
            if user.check_password(password):
                return user
        except Users.DoesNotExist:
            return None
    def get_user(self, user_id_suf):
        try:
            user = Users.objects.get(pk=user_id_suf)
            return f"Welcome back, {user.user_pid}{user.user_id_suf}"
        except Users.DoesNotExist:
            return None