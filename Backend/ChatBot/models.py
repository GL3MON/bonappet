from django.db import models
from django.core.validators import MaxLengthValidator
from pgvector.django import VectorField
from pgvector.django import HnswIndex


class Restaurant(models.Model):
    restaurant_id = models.BigAutoField(primary_key=True)
    name =  models.TextField()
    restaurant_type = models.BooleanField(default=False)
    location = models.TextField(null=True)
    rating = models.SmallIntegerField(validators=[MaxLengthValidator(10)],default=1)

class Food(models.Model):
    food_id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    restaurant = models.ForeignKey(
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
    
    class Meta:
        indexes = [
            HnswIndex(
                name="food_desc_vector_index",
                fields = ["embedding"],
                m=16,
                ef_construction=64,
                opclasses=["vector_cosine_ops"],
            )
        ]

class LLMChat(models.Model):
    user = models.OneToOneField('UserData.Customer', on_delete=models.CASCADE, null=True)
    chat = models.TextField()


