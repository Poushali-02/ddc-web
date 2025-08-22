from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from blogs.models import Blog
from .serializers import BlogSerializer
from django.db import models

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
    def get_queryset(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return Blog.objects.filter(created_by=self.request.user)
        return Blog.objects.filter(is_published=True)

@api_view(['GET'])
def get_domains(request):
    domains = Blog.objects.values_list('domain', flat=True).distinct()
    return Response({'domains': list(domains)})

@api_view(['GET'])
def get_blogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
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
    