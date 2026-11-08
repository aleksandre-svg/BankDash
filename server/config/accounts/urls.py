from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView, LogoutView, ChangePasswordView, send_verification_code, verify_email, get_csrf

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('auth/send-verification/', send_verification_code, name='send-verification'),
    path('auth/verify-email/', verify_email, name='verify-email'),
    path('get-csrf/', get_csrf, name='get_csrf'),
]