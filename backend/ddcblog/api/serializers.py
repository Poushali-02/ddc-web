from rest_framework import serializers
from django.contrib.auth.models import User
from blogs.models import Blog, RSSFeed

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    passwordConfirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'passwordConfirm', 'first_name', 'last_name']

    def validate(self, data):
        if data['password'] != data['passwordConfirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('passwordConfirm')
        user = User.objects.create_user(**validated_data)
        return user
    
class BlogSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"
        read_only_fields = ['created_at', 'created_by']
        
class RSSFeedSerializer(serializers.ModelSerializer):
    added_by = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = RSSFeed
        fields = '__all__'
        read_only_fields = ['added_by', 'created_at', 'last_fetched']