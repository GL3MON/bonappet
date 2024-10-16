from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.chat, name="chat"),
    path("insert-food/", views.insert_food, name="insert-food"),
    path("test/", views.test_vector, name="test"),
]