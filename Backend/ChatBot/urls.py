from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.chat, name="chat"),
    path("insert-food/", views.insert_food, name="insert-food"),
    path("test/", views.test_vector, name="test"),
    path("clear/", views.clear_chat, name="clear"),
    path('create_llmchat/', views.create_LLMChat, name='create_llmchat'),
]