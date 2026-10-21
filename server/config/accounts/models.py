from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    date_of_birth = models.DateField(null=True)
    present_address = models.CharField(max_length=100, blank=True)
    permanent_address = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=40)
    postal_code = models.CharField(max_length=10)
    two_factor_authentication = models.BooleanField(default=False)
    prefered_currency = models.CharField(max_length=10, default="USD")
    prefered_timezone = models.CharField(max_length=50, default="UTC")