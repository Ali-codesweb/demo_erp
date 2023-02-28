from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import (UserSerializerToken,
                              UserSerializerWithToken)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value
        del data["refresh"]
        del data["access"]
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
    except:
        message = {'message': 'This user already exists'}
        return Response(message, status=status.HTTP_403_FORBIDDEN)
    serializer = UserSerializerToken(user)
    return Response(serializer.data)

