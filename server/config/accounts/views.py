import random
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, permissions
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from cards.models import Card
from cards.serializers import CardSerializer
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated, AllowAny


User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                
                request.session.save()
                request.session.set_expiry(1209600)
                
                response = Response({'detail': 'Successfully logged in.'}, status=status.HTTP_200_OK)
                return response
                
        except User.DoesNotExist:
            pass
            
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['get'])
    def cards(self, request, pk=None):
        user_cards = Card.objects.filter(card_holder_id=pk)
        serializer = CardSerializer(user_cards, many=True)
        return Response(serializer.data)
    
    
    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        user = request.user
        
        print(user)
        
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not current_password or not new_password:
            return Response({'detail': 'Both fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({'current_password': ['Wrong password.']}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        login(request, user)

        return Response({'detail': 'Password changed successfully.'}, status=status.HTTP_200_OK)
    
# views.py
import random
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_verification_code(request):
    user = request.user
    code = f"{random.randint(100000, 999999)}"
    user.verification_code = code
    user.save()

    send_mail(
        'Verify Your Email - BankDash',
        f'Your verification code is: {code}',
        'noreply@bankdash.com',
        [user.email],
        fail_silently=False,
    )
    return Response({"detail": "Verification code sent successfully."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_email(request):
    user = request.user
    code = request.data.get('code')

    if user.verification_code and user.verification_code == code:
        user.is_email_verified = True
        user.verification_code = None
        user.save()
        return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)
    
    return Response({"detail": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)