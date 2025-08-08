from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from blogs.models import Blog, RSSFeed
from .serializers import UserRegistrationSerializer, BlogSerializer, RSSFeedSerializer
from .rss_processor import RSSProcessor
from django.db import models

# Authentication Views
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'token': token.key
        }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            },
            'token': token.key
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logged out successfully'})
    except:
        return Response({'error': 'Error logging out'}, status=status.HTTP_400_BAD_REQUEST)

# Blog Views
class BlogListCreateView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    
    def get_queryset(self):
        domain = self.request.query_params.get('domain')
        if domain:
            return Blog.objects.filter(domain=domain, is_published=True)
        return Blog.objects.filter(is_published=True)
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
    def get_queryset(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return Blog.objects.filter(created_by=self.request.user)
        return Blog.objects.filter(is_published=True)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_domains(request):
    domains = Blog.objects.values_list('domain', flat=True).distinct()
    return Response({'domains': list(domains)})

# RSS Import Views
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def import_rss_feed(request):
    rss_url = request.data.get('rss_url')
    domain = request.data.get('domain', 'General')
    
    if not rss_url:
        return Response({'error': 'RSS URL is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Save RSS feed record
        rss_feed, created = RSSFeed.objects.get_or_create(
            url=rss_url,
            defaults={'domain': domain, 'added_by': request.user}
        )
        
        # Process RSS feed
        processor = RSSProcessor()
        result = processor.process_feed(rss_url, domain, request.user)
        
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_all_projects(request):
    """GET /projects - Get all blogs with domain summary"""
    try:
        # Get all domains with count
        domains = Blog.objects.filter(is_published=True).values('domain').annotate(
            count=models.Count('domain')
        ).order_by('domain')
        
        domain_list = [domain['domain'] for domain in domains]
        
        return Response({
            'domains': domain_list,
            'count of domains': len(domain_list),
            'domain_details': list(domains)
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_projects_by_domain(request, domain):
    """GET /projects/<domain> - Get all blogs in specific domain"""
    try:
        blogs = Blog.objects.filter(domain=domain, is_published=True).order_by('-created_at')
        
        if not blogs.exists():
            return Response({
                'error': f'No blogs found in domain: {domain}',
                'available_domains': list(Blog.objects.values_list('domain', flat=True).distinct())
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BlogSerializer(blogs, many=True)
        
        return Response({
            'domain': domain,
            'count': blogs.count(),
            'blogs': serializer.data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_specific_project(request, domain, blog_id):
    """GET /projects/<domain>/<id> - Get specific blog by domain and ID"""
    try:
        blog = Blog.objects.filter(
            id=blog_id, 
            domain=domain, 
            is_published=True
        ).first()
        
        if not blog:
            return Response({
                'error': f'Blog with ID {blog_id} not found in domain {domain}',
                'debug': {
                    'requested_id': blog_id,
                    'requested_domain': domain,
                    'available_blogs_in_domain': list(
                        Blog.objects.filter(domain=domain).values_list('id', flat=True)
                    )
                }
            }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BlogSerializer(blog)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)