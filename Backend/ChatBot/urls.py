from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.chat, name="chat"),
    path("insert-food/", views.insert_food, name="insert-food"),
    path("test/", views.test_vector, name="test"),
    path("clear/", views.clear_chat, name="clear"),
    path("fooditems/", views.get_fooditems, name="food-items"),
    path("top_restaurants/", views.topfive_restaurants, name="top-five-rest"),
    path("restaurant_details/", views.restauarant_details, name="restaurant-details"),
    path("top_foods/", views.top_foods, name="top-foods"),
    path("trending_foods/", views.trending_foods, name="trending-foods"),
    path("search/", views.search, name="search"),
]   
