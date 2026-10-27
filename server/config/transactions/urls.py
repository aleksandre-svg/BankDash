from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, NotificationViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'notifications', NotificationViewSet, basename='notification')
urlpatterns = [
    path('', include(router.urls)),
]