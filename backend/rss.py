import feedparser
import requests

class RSSProcessor:
    def __init__(self, app=None, db=None, blog_model=None):
        self.app = app
        self.db = db
        self.Blog = blog_model
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def fetch_and_parse_rss(self, rss_url):
        """Fetch RSS feed and parse it"""
        try:
            response = self.session.get(rss_url, timeout=10)
            response.raise_for_status()
            
            # Parse RSS feed
            feed = feedparser.parse(response.content)
            
            if feed.bozo:
                print(f"Warning: RSS feed has issues: {feed.bozo_exception}")
            
            return feed
        except Exception as e:
            print(f"Error fetching RSS feed: {e}")
            return None
    
    def extract_content(self, entry):
        """Extract and clean content from RSS entry"""
        content = ""
        
        # Try different content fields
        if hasattr(entry, 'content') and entry.content:
            content = entry.content[0].value
        elif hasattr(entry, 'description') and entry.description:
            content = entry.description
        elif hasattr(entry, 'summary') and entry.summary:
            content = entry.summary
        
        
        return content
    
    def extract_blog_link(self, entry):
        blog_link = ""
        
    # Try different link fields
        if hasattr(entry, 'link') and entry.link:
            blog_link = entry.link
        elif hasattr(entry, 'links') and entry.links:
            # Sometimes there are multiple links, get the first one
            for link in entry.links:
                if hasattr(link, 'href'):
                    blog_link = link.href
                    break
        elif hasattr(entry, 'id') and entry.id:
            # Sometimes the ID is the URL
            blog_link = entry.id
        
        return blog_link
    
    def extract_tags(self, entry, default_domain="General"):
        """Extract tags/categories from RSS entry"""
        tags = []
        
        # Try to get tags from different fields
        if hasattr(entry, 'tags') and entry.tags:
            tags = [tag.term for tag in entry.tags]
        elif hasattr(entry, 'categories') and entry.categories:
            tags = entry.categories
        
        # If no tags found, try to extract from title or content
        if not tags:
            title = getattr(entry, 'title', '')
            # Simple keyword extraction (you can make this more sophisticated)
            keywords = ['python', 'javascript', 'react', 'flask', 'ai', 'ml', 'web', 'api']
            for keyword in keywords:
                if keyword.lower() in title.lower():
                    tags.append(keyword.title())
        
        # Return first tag or default
        return tags[0] if tags else default_domain
    
    def extract_author(self, entry, feed_title="Unknown"):
        """Extract author from RSS entry"""
        author = "Unknown Author"
        
        if hasattr(entry, 'author') and entry.author:
            author = entry.author
        elif hasattr(entry, 'authors') and entry.authors:
            if hasattr(entry.authors[0], 'name') and entry.authors[0].name:
                author = entry.authors[0].name
            else:
                author = str(entry.authors[0])
        else:
            # Use feed title as fallback
            author = feed_title
        
        return author
    
    def process_rss_feed(self, rss_url, domain_override=None):
        """Process entire RSS feed and save to database"""
        if not self.app or not self.db or not self.Blog:
            return {"error": "RSS Processor not properly initialized"}
            
        feed = self.fetch_and_parse_rss(rss_url)
        
        if not feed:
            return {"error": "Failed to fetch RSS feed"}
        
        processed_blogs = []
        skipped_blogs = []
        
        with self.app.app_context():
            for entry in feed.entries:
                try:
                    # Extract data
                    title = getattr(entry, 'title', 'Untitled')
                    content = self.extract_content(entry)
                    domain = domain_override or self.extract_tags(entry)
                    writer = self.extract_author(entry, feed.feed.get('title', 'RSS Feed'))
                    blog_link = self.extract_blog_link(entry)
                    
                    # Skip if essential data is missing
                    if not title or not content:
                        skipped_blogs.append(f"Skipped: {title} (missing content)")
                        continue
                    
                    # Check if blog already exists (by title and domain)
                    existing_blog = self.Blog.query.filter_by(title=title, domain=domain).first()
                    if existing_blog:
                        skipped_blogs.append(f"Already exists: {title}")
                        continue
                    
                    # Create new blog
                    blog = self.Blog(
                        title=title,
                        content=content,
                        domain=domain,
                        writer=writer,
                        blog_link=blog_link if blog_link else None
                    )
                    
                    self.db.session.add(blog)
                    processed_blogs.append({
                        'title': title,
                        'domain': domain,
                        'writer': writer,
                        'blog_link': blog_link if blog_link else None,
                    })
                    
                except Exception as e:
                    skipped_blogs.append(f"Error processing entry: {str(e)}")
                    continue
            
            # Commit all changes
            try:
                self.db.session.commit()
                return {
                    'success': True,
                    'processed': len(processed_blogs),
                    'skipped': len(skipped_blogs),
                    'blogs': processed_blogs,
                    'skipped_details': skipped_blogs
                }
            except Exception as e:
                self.db.session.rollback()
                return {'error': f'Database error: {str(e)}'}