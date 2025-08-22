import os
import django
import time
import sys

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ddcblog.settings")

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "ddcblog"))

django.setup()

from blogs.models import RSSFeed
from api.rss_processor import RSSProcessor

def sync_all_feeds(domain):
    feeds = RSSFeed.objects.filter(domain=domain)
    processor = RSSProcessor()
    for feed in feeds:
        try:
            print(f"Processing {feed.url} ...")
            processor.process_feed(feed.url, domain_override=None, user=feed.added_by)
        except Exception as e:
            print(f"Error processing {feed.url}: {e}")

available_domains = [
    'Web development',
    'javascript',
    'Technology',
    'Artificial Intelligence'
]

if __name__ == "__main__":
    while True:
        print("[SYNC] Starting RSS feed sync...")
        print("Added domains:")
        for domain in available_domains:
            print(f" - {domain}")
            sync_all_feeds(domain)
        print("[SYNC] Done. Sleeping for 1 day (86400 seconds)...")
        time.sleep(86400)  # Sleep for 1 day
