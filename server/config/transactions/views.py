from rest_framework import exceptions, viewsets
from .models import Transaction, Notification
from .serializers import TransactionSerializer, NotificationSerializer
from rest_framework import exceptions, viewsets
from .models import Transaction, Card
from django.db.models import Q

# views.py
class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(
            Q(transaction_owner=user) | Q(card__card_holder=user)
        ).distinct().order_by('-date')
    
    def perform_create(self, serializer):
        amount = serializer.validated_data.get('balance')
        target_card = serializer.validated_data.get('card')
        source_card_id = self.request.data.get('source_card_id')
        
        if source_card_id:
            try:
                source_card = Card.objects.get(pk=source_card_id, card_holder=self.request.user)
                if source_card.balance < amount:
                    raise exceptions.ValidationError("Insufficient funds")
                source_card.balance -= amount
                source_card.save()
            except Card.DoesNotExist:
                raise exceptions.ValidationError("Source card not found")
                
        if target_card:
            target_card.balance += amount
            target_card.save()
            
            recipient = target_card.card_holder
            if recipient != self.request.user:
                Notification.objects.create(
                    user=recipient,
                    message=f"You received ${amount} from {self.request.user.username} on card {target_card.card_number[-4:]}"
                )
            
        serializer.save(transaction_owner=self.request.user)

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)