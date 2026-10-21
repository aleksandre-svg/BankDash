from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CardViewSet

router = DefaultRouter()
router.register(r'cards', CardViewSet, basename='card')

urlpatterns = [
    path('', include(router.urls)),
]