from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Blog(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    domain = models.CharField(max_length=100, null=True, blank=True)
    writer = models.CharField(max_length=100, null=True, blank=True)
    blog_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs', null=True, blank=True)
    is_published = models.BooleanField(default=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title
    
class RSSFeed(models.Model):
    url = models.URLField(unique=True)
    domain = models.CharField(max_length=100)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    last_fetched = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.domain} - {self.url}"