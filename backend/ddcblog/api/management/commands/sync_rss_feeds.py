from django.core.management.base import BaseCommand
from django.utils import timezone
from blogs.models import RSSFeed
from api.rss_processor import RSSProcessor
from datetime import timedelta

class Command(BaseCommand):
    help = 'Sync all active RSS feeds and import new blogs'

    def add_arguments(self, parser):
        parser.add_argument(
            '--hours',
            type=int,
            default=24,
            help='Only sync feeds not updated in the last X hours (default: 24)'
        )

    def handle(self, *args, **options):
        hours_threshold = options['hours']
        cutoff_time = timezone.now() - timedelta(hours=hours_threshold)
        
        # Get active RSS feeds that need updating
        feeds_to_sync = RSSFeed.objects.filter(
            is_active=True,
            last_fetched__lt=cutoff_time
        ) | RSSFeed.objects.filter(
            is_active=True,
            last_fetched__isnull=True
        )
        
        self.stdout.write(f"Found {feeds_to_sync.count()} feeds to sync")
        
        processor = RSSProcessor()
        total_new_blogs = 0
        
        for feed in feeds_to_sync:
            self.stdout.write(f"Syncing: {feed.url}")
            
            try:
                result = processor.process_feed(
                    rss_url=feed.url,
                    domain_override=feed.domain,
                    user=feed.added_by
                )
                
                if result.get('success'):
                    new_blogs = result.get('processed', 0)
                    total_new_blogs += new_blogs
                    
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"✓ {feed.url}: {new_blogs} new blogs added"
                        )
                    )
                    
                    # Update last_fetched time
                    feed.last_fetched = timezone.now()
                    feed.save()
                else:
                    self.stdout.write(
                        self.style.ERROR(f"✗ {feed.url}: {result.get('error')}")
                    )
                    
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f"✗ {feed.url}: {str(e)}")
                )
        
        self.stdout.write(
            self.style.SUCCESS(
                f"Sync complete! {total_new_blogs} total new blogs added"
            )
        )
