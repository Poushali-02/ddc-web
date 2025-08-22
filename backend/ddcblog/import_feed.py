import os
import sys
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ddcblog.settings")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

django.setup()

from django.utils import timezone
from blogs.models import Blog
from api.rss_processor import RSSProcessor  

RSS_FEED_BASE_URL = "https://medium.com/feed/devdotcom/tagged"


def add_blogs_by_domain(domain_tag):
    domain_tag = domain_tag.lower()
    url = '/' + domain_tag.replace(" ", "-")
    full_url = RSS_FEED_BASE_URL + url

    print(f"Fetching: {full_url}")
    
    processor = RSSProcessor()
    feed = processor.process_feed(full_url, domain_override=domain_tag, user=None)
    added_count = 0

    if feed.get('success'):
        try:
            for each in feed.get('blogs', []):
                title = each.get('title', 'Untitled')
                content = each.get('content', 'No Content')
                writer = each.get('writer', 'Unknown Author')
                blog_link = each.get('blog_link', None)

                if blog_link and Blog.objects.filter(blog_link=blog_link).exists():
                    print(f"Blog already exists: {blog_link}")
                    continue

                blog = Blog(
                    title=title,
                    content=content,
                    domain=domain_tag,
                    writer=writer,
                    blog_link=blog_link,
                    created_at=timezone.now(),
                    is_published=True,
                    created_by=None
                )
                blog.save()
                added_count += 1
        except Exception as e:
            print(f"Error processing blog: {e}")

    else:
        print("Failed to fetch or process feed.")

    print(f"Added {added_count} blogs with tag '{domain_tag}'.")

domains = [
    'Web development',
    'javascript',
    'Technology',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'programming'
]

def start_importing():
    for domain in domains:
        add_blogs_by_domain(domain)

if __name__ == "__main__":
    start_importing()
    print("Will be back when you call me again")
