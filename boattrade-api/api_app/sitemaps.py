from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Boat

class BoatSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Boat.objects.filter(is_active=True)
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f"/boats/{obj.id}"

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = "monthly"

    def items(self):
        return ['homepage', 'boats_listing', 'sell_my_boat']
    
    def location(self, item):
        if item == 'homepage':
            return '/'
        elif item == 'boats_listing':
            return '/boats'
        elif item == 'sell_my_boat':
            return '/sell-my-boat'
