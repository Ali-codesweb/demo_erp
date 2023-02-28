from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken

class UserSerializerToken(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        fields = ['id', 'username', 'first_name', 'last_name',
                  'email', 'is_admin']
        model = User

    def get_is_admin(self, obj:User):
        return obj.is_superuser

    def get_first_name(self, obj):
        return obj.first_name

    def get_last_name(self, obj):
        return obj.last_name


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username', 'first_name',
                  'last_name', 'token', 'is_admin']

    def get_token(self, obj):
        token = AccessToken.for_user(obj)
        return str(token)

  

    def get_is_admin(self, obj:User):
        return obj.is_superuser
