from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    preferred_domains = models.JSONField(default=list, blank=True)
    can_import_rss = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"