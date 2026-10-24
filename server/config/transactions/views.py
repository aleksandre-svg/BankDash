from rest_framework import viewsets
from rest_framework import viewsets
from .serializers import TransactionSerializer
from .models import Transaction



class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    
    def get_queryset(self):
        return Transaction.objects.filter(transaction_owner=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(transaction_owner=self.request.user)