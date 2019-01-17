# example/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import Trip


class UserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    group = serializers.CharField()
    photo = serializers.ImageField(allow_empty_file=True, use_url=False) 

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match.')
        return data

    def create(self, validated_data):
        group_data = validated_data.pop('group')
        group, _ = Group.objects.get_or_create(name=group_data)
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }
        data['password'] = validated_data['password1']
        user =  self.Meta.model.objects.create_user(**data)
        user.groups.add(group)
        user.save()
        return user


    class Meta:
        model = get_user_model()
        fields = (
            'id', 'username', 'password1', 'password2',
            'first_name', 'last_name','group','photo'
        )
        read_only_fields = ('id',)


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'
        read_only_fields = ('id','nk','created','updated')


class ReadOnlyTripSerializer(serializers.ModelSerializer):
    driver = UserSerializer()
    rider = UserSerializer()

    class Meta:
        model = Trip
        fields = '__all__'
