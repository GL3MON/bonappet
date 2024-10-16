# Generated by Django 5.1.1 on 2024-10-16 13:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserData', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliverypartners',
            name='password',
            field=models.CharField(default=12345678, max_length=200, validators=[django.core.validators.MinLengthValidator(8)]),
        ),
    ]
