from rest_framework import serializers
from django.contrib.auth.models import User
from blogs.models import Blog, RSSFeed
    
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