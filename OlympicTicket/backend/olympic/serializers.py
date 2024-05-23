from rest_framework import serializers
from .models import Event, Ticket
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password



class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class UserTicketSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = Ticket
        fields = '__all__'

class UserSerializerXX(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
