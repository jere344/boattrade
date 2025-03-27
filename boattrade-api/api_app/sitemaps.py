from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Boat

class BoatSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # Added order_by to fix the unordered object list warning
        return Boat.objects.filter(is_active=True).order_by('id')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    # Use absolute URLs for boat details
    def location(self, obj):
        # For absolute URLs, you might want to include your domain
        return f"/boats/{obj.id}/"

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = "monthly"

    def items(self):
        return ['homepage', 'boats_listing', 'services']
    
    def location(self, item):
        if item == 'homepage':
            return '/'
        elif item == 'boats_listing':
            return '/boats/'
        elif item == 'services':
            return '/services/'
        return '/'
