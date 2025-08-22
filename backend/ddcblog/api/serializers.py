from rest_framework import serializers
from django.contrib.auth.models import User
from blogs.models import Blog
    
class BlogSerializer(serializers.ModelSerializer):
    created_at = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Blog
        fields = "__all__"
        read_only_fields = ['created_at']
        
