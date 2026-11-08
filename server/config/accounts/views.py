import random
import resend
from decouple import config
from rest_framework import viewsets, status, permissions
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework.decorators import action, permission_classes, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from cards.models import Card
from cards.serializers import CardSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer
from django.conf import settings
from django.middleware.csrf import get_token

@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf(request):
    return Response({'csrfToken': get_token(request)})

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(request, username=user_obj.username, password=password)
            if user is not None:
                login(request, user)
                
                request.session.modified = True
                request.session.save()
                
                csrf_token = get_token(request)
                
                serializer = UserSerializer(user)
                
                response_data = serializer.data
                response_data['csrf_token'] = csrf_token
                return Response(response_data, status=status.HTTP_200_OK)
                
        except User.DoesNotExist:
            pass
            
        return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        user.is_email_verified = False
        user.save(update_fields=['is_email_verified'])
        logout(request)
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def cards(self, request, pk=None):
        user_cards = Card.objects.filter(card_holder_id=pk)
        serializer = CardSerializer(user_cards, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get', 'put', 'patch'])
    def me(self, request):
        user = request.user
        
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

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
    
    
resend.api_key = config("RESEND_API_KEY", default="")

import random
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from decouple import config
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def send_verification_code(request):
    email = request.data.get('email')
    
    if not email:
        return Response({"error": "Email address is required."}, status=400)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User with this email does not exist."}, status=404)
    
    code = f"{random.randint(100000, 999999)}"
    user.verification_code = code
    user.save(update_fields=['verification_code'])
    
    html_message = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Verify Your Email</title></head>
        <body style="margin: 0; padding: 0; background-color: #090d16; font-family: 'Segoe UI', sans-serif; color: #f8fafc;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 40px auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px;">
                <tr><td align="center" style="padding: 40px 0 20px 0;"><h2 style="color: #ffffff;">BankDash</h2></td></tr>
                <tr>
                    <td style="padding: 20px 40px 40px 40px; text-align: center;">
                        <h3 style="color: #ffffff;">Confirm your email address</h3>
                        <p style="color: #94a3b8;">Please use the verification code below to complete your registration:</p>
                        <div style="background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 16px; display: inline-block;">
                            <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #818cf8; letter-spacing: 6px;">{code}</span>
                        </div>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    """
    
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = config('BREVO_API_KEY', default='')
    
    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(sib_api_v3_sdk.ApiClient(configuration))
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": user.email}],
        sender={"name": "BankDash", "email": "datodzukaevi38@gmail.com"},
        subject="Verify Your Email - BankDash",
        html_content=html_message
    )
    
    try:
        api_instance.send_transac_email(send_smtp_email)
    except ApiException as e:
        return Response({"error": f"Failed to send email: {str(e)}"}, status=500)
    
    return Response({"message": "Verification code sent successfully!"})

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    user = request.user
    code = request.data.get('code')

    if not code:
        return Response({"detail": "Verification code is required."}, status=status.HTTP_400_BAD_REQUEST)

    if user.verification_code and user.verification_code == code:
        user.is_email_verified = True
        user.verification_code = None
        user.save(update_fields=['is_email_verified', 'verification_code'])
        return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)
    
    return Response({"detail": "Invalid verification code."}, status=status.HTTP_400_BAD_REQUEST)