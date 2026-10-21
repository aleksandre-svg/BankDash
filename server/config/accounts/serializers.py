from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'date_of_birth', 'present_address', 'permanent_address',
            'city', 'country', 'postal_code', 'two_factor_authentication',
            'prefered_currency', 'prefered_timezone', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
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