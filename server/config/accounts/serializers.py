from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'profile_picture',
            'date_of_birth', 'present_address', 'permanent_address',
            'city', 'country', 'postal_code', 'is_email_verified', 'two_factor_authentication',
            'prefered_currency', 'prefered_timezone', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'username': {'required': False},
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'date_of_birth': {'required': False, 'allow_null': True},
            'present_address': {'required': False, 'allow_null': True, 'allow_blank': True},
            'permanent_address': {'required': False, 'allow_null': True, 'allow_blank': True},
            'city': {'required': False, 'allow_null': True, 'allow_blank': True},
            'country': {'required': False, 'allow_null': True, 'allow_blank': True},
            'postal_code': {'required': False, 'allow_null': True, 'allow_blank': True},
            'prefered_currency': {'required': False, 'allow_null': True, 'allow_blank': True},
            'prefered_timezone': {'required': False, 'allow_null': True, 'allow_blank': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    
    def to_representation(self, instance):
        if isinstance(instance, serializers.empty) or getattr(instance, 'is_anonymous', False):
            return {}
        return super().to_representation(instance)