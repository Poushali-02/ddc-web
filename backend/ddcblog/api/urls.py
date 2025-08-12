from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Blogs
    path('blogs/', views.BlogListCreateView.as_view(), name='blog-list'),
    path('blogs/<int:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),
    path('domains/', views.get_domains, name='domains'),
    
    # RSS
    path('import-rss/', views.import_rss_feed, name='import-rss'),
    path('sync-feeds/', views.sync_all_feeds, name='sync-feeds'),
    
    path('projects/', views.get_all_projects, name='all-projects'),  # GET /projects
    path('projects/<str:domain>/', views.get_projects_by_domain, name='projects-by-domain'),  # GET /projects/<domain>
    path('projects/<str:domain>/<int:blog_id>/', views.get_specific_project, name='specific-project'),  # GET /projects/<domain>/<id>
]