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
    is_published = models.BooleanField(default=True, null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title
    