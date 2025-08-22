from django.urls import path
from . import views

urlpatterns = [
    #Blogs
    
    path('blogs/', views.get_blogs, name='blog-list'),
    path('blogs/<int:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),
    path('domains/', views.get_domains, name='domains'),
    
    # Get projects, by domain, by id
    
    path('projects/', views.get_all_projects, name='all-projects'),  # GET /projects
    path('projects/<str:domain>/', views.get_projects_by_domain, name='projects-by-domain'),  # GET /projects/<domain>
    path('projects/<str:domain>/<int:blog_id>/', views.get_specific_project, name='specific-project'),  # GET /projects/<domain>/<id>
]