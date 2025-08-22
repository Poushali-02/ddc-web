from django.core.management.base import BaseCommand
from api.rss_processor import RSSProcessor
from blogs.models import Blog
from django.utils import timezone


domains = [
    'Web development',
    'javascript',
    'Technology',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'programming',
    'javascript-tips',
    'tech'
]

class Command(BaseCommand):
    help = 'Import RSS feeds for defined domains'
    RSS_FEED_BASE_URL = "https://medium.com/feed/devdotcom/tagged"


    def add_blogs_by_domain(self, domain_tag):
        domain_tag = domain_tag.lower()
        url = '/' + domain_tag.replace(" ", "-")
        full_url = self.RSS_FEED_BASE_URL + url

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
                    )
                    blog.save()
                    added_count += 1
            except Exception as e:
                print(f"Error processing blog: {e}")

        else:
            print("Failed to fetch or process feed.")

        print(f"Added {added_count} blogs with tag '{domain_tag}'.")


    def handle(self, *args, **kwargs):
        for domain in domains:
            self.add_blogs_by_domain(domain)