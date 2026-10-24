from rest_framework import viewsets
from rest_framework import viewsets
from .serializers import CardSerializer
from .models import Card


# Create your views here.
class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    
    def get_queryset(self):
        return Card.objects.filter(card_holder=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(card_holder=self.request.user)