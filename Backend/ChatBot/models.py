from django.db import models
from django.core.validators import MaxValueValidator
from pgvector.django import VectorField
from pgvector.django import HnswIndex


class Restaurant(models.Model):
    restaurant_id = models.BigAutoField(primary_key=True)
    name =  models.TextField()
    restaurant_type = models.BooleanField(default=False)
    cuisine = models.CharField(max_length=100, default="Indian")
    availability = models.BooleanField(default=True)
    contact_no = models.BigIntegerField(validators=[MaxValueValidator(9999999999)], default=1234567890)
    location = models.TextField(null=True)
    rating = models.SmallIntegerField(validators=[MaxValueValidator(5)],default=1)

class Food(models.Model):
    food_id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    cuisine_type = models.CharField(max_length=100, default="Indian")
    food_category = models.BooleanField(default=True)
    rating = models.SmallIntegerField(validators=[MaxValueValidator(5)], default=1)
    availability = models.BooleanField(default=True)
    price = models.IntegerField
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