from rest_framework import serializers
from django.contrib.auth.models import User
from blogs.models import Blog, RSSFeed
from accounts.models import UserProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    passwordConfirm = serializers.CharField(write_only=True)
    bio = serializers.CharField(max_length=500, required=False, allow_blank=True)
    preferred_domains = serializers.ListField(
        child=serializers.CharField(max_length=100),
        required=False,
        allow_empty=True
    )
    can_import_rss = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'passwordConfirm', 'first_name', 'last_name', 
                 'bio', 'preferred_domains', 'can_import_rss']

    def validate(self, data):
        if data['password'] != data['passwordConfirm']:
            raise serializers.ValidationError("Passwords don't match")
        return data
    
    def create(self, validated_data):
        # Extract UserProfile fields
        bio = validated_data.pop('bio', '')
        preferred_domains = validated_data.pop('preferred_domains', [])
        can_import_rss = validated_data.pop('can_import_rss', False)
        validated_data.pop('passwordConfirm')
        
        # Create User
        user = User.objects.create_user(**validated_data)
        
        # Create UserProfile
        UserProfile.objects.create(
            user=user,
            bio=bio,
            preferred_domains=preferred_domains,
            can_import_rss=can_import_rss
        )
        
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