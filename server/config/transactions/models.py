from django.db import models
from cards.models import Card
from django.conf import settings

# Create your models here.
class Transaction(models.Model):
    description = models.CharField(max_length=50)
    transaction_type = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    transation_result = models.BooleanField()
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    transaction_owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default='bank')

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']