from django.db import models
from pgvector.django import VectorField

# Create your models here.

class Restaurant(models.Model):
    restaurant_id = models.BigAutoField(primary_key=True)
    name =  models.TextField()
    restaurant_type = models.BooleanField(default=False)
    location = models.TextField(null=True)
    rating = models.SmallIntegerField(max_length=5,default=1)

class Food(models.Model):
    food_id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    restaurant_id = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        blank=False
    )
    description = models.TextField()
    embedding = VectorField(
        dimensions=768,
        help_text="Food Description embeddings",
        null=True,
        blank=True,
    )
