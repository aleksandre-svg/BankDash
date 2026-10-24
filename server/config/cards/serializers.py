from rest_framework import serializers
from .models import Card
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            'id', 'balance', 'card_holder', 'valid_date', 'card_number', 'bank', 'cvc'
        ]
        read_only_fields = ['card_holder'] 
        extra_kwargs = {
            'cvc': {'write_only': True}
        }