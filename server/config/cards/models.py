from django.db import models
from django.conf import settings

class Card(models.Model):
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    card_holder = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    valid_date = models.DateField()
    card_number = models.CharField(max_length=16, unique=True)
    bank = models.CharField(max_length=50)
    cvc = models.CharField(max_length=4)