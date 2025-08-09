from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from rss import RSSProcessor

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

CORS(app)  # Enable CORS for all routes

# Blog Model
class Blog(db.Model):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    writer = db.Column(db.String(150), nullable=False)
    blog_link = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, title, content, domain, writer, blog_link=None):
        self.title = title
        self.content = content
        self.domain = domain
        self.writer = writer
        self.blog_link = blog_link

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'domain': self.domain,
            'writer': self.writer,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'blog_link': self.blog_link
        }

# API Routes

@app.route('/projects', methods=['GET'])
def get_all_domains():
    """Get all unique domains (tags)"""
    try:
        domains = db.session.query(Blog.domain).distinct().all()
        domain_list = [domain[0] for domain in domains]
        
        return jsonify({
            'domains': domain_list,
            'count of domains': len(domain_list)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/projects/<domain>', methods=['GET'])
def get_blogs_by_domain(domain):
    """Get all blogs filtered by domain"""
    try:
        blogs = Blog.query.filter_by(domain=domain).all()
        
        if not blogs:
            return jsonify({
                'domain': domain,
                'count': 0,
                'message': f'No blogs found for domain: {domain}',
                'blogs': []
            }), 200
        
        blogs_data = [blog.to_dict() for blog in blogs]
        
        return jsonify({
            'domain': domain,
            'count': len(blogs_data),
            'blogs': blogs_data
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/projects/<domain>/<int:blog_id>', methods=['GET'])
def get_blog_by_id(domain, blog_id):
    """Get specific blog by domain and ID"""
    try:
        blog = Blog.query.filter_by(id=blog_id, domain=domain).first()
        
        if not blog:
            return jsonify({
                'error': f'Blog with ID {blog_id} not found in domain {domain}'
            }), 404
        
        return jsonify(blog.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/import-rss', methods=['POST'])
def import_from_rss():
    """Import blogs from RSS feed"""
    try:
        data = request.get_json()
        
        if not data or 'rss_url' not in data:
            return jsonify({'error': 'RSS URL is required'}), 400
        
        rss_url = data['rss_url']
        domain_override = data.get('domain')  # Optional domain override
        
        # Create RSS processor instance
        rss_processor = RSSProcessor(app=app, db=db, blog_model=Blog)
        
        # Process RSS feed
        result = rss_processor.process_rss_feed(rss_url, domain_override)
        
        if 'error' in result:
            return jsonify(result), 500
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/import-rss-simple/<path:encoded_url>', methods=['GET'])
def import_from_rss_simple(encoded_url):
    """Simple GET endpoint for RSS import (URL encoded in path)"""
    try:
        import urllib.parse
        rss_url = urllib.parse.unquote(encoded_url)
        
        # Create RSS processor instance
        rss_processor = RSSProcessor(app=app, db=db, blog_model=Blog)
        
        result = rss_processor.process_rss_feed(rss_url)
        
        if 'error' in result:
            return jsonify(result), 500
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/all-blogs', methods=['GET'])
def get_all_blogs():
    """Get all blogs for debugging"""
    try:
        blogs = Blog.query.all()
        blogs_data = [blog.to_dict() for blog in blogs]
        
        # Also get unique domains
        domains = db.session.query(Blog.domain).distinct().all()
        domain_list = [domain[0] for domain in domains]
        
        return jsonify({
            'total_blogs': len(blogs_data),
            'blogs': blogs_data,
            'domains': domain_list
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/admin/clear-database', methods=['POST'])
def clear_database():
    """Clear all blogs from database"""
    try:
        Blog.query.delete()
        db.session.commit()
        return jsonify({'success': True, 'message': 'Database cleared successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/user/import-feed', methods=['POST'])
def user_import_feed():
    """User-friendly RSS import with better validation"""
    try:
        data = request.get_json()
        
        if not data or 'rss_url' not in data:
            return jsonify({
                'success': False,
                'error': 'RSS URL is required',
                'example': 'https://medium.com/feed/@username'
            }), 400
        
        rss_url = data['rss_url'].strip()
        domain = data.get('domain', '').strip()
        
        # Validate URL format
        if not rss_url.startswith(('http://', 'https://')):
            return jsonify({
                'success': False,
                'error': 'Please provide a valid HTTP/HTTPS URL'
            }), 400
        
        # Create RSS processor
        rss_processor = RSSProcessor(app=app, db=db, blog_model=Blog)
        
        # Process feed
        result = rss_processor.process_rss_feed(rss_url, domain if domain else None)
        
        if 'error' in result:
            return jsonify({
                'success': False,
                'error': result['error'],
                'tip': 'Make sure the RSS URL is correct and accessible'
            }), 400
        
        # Enhanced success response
        return jsonify({
            'success': True,
            'processed': result.get('processed', 0),
            'skipped': result.get('skipped', 0),
            'feed_title': result.get('feed_title', 'Unknown'),
            'message': f"Successfully imported {result.get('processed', 0)} blogs!",
            'next_steps': [
                f"View your blogs: GET /projects/{domain if domain else 'your-domain'}",
                "Get all domains: GET /projects"
            ]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}',
            'tip': 'Please try again or contact support'
        }), 500

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)