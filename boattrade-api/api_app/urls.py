from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib.sitemaps.views import sitemap
from . import views
from .sitemaps import BoatSitemap, StaticViewSitemap

router = DefaultRouter()
router.register(r'boats', views.BoatViewSet)
router.register(r'categories', views.BoatCategoryViewSet)
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'blog', views.BlogPostViewSet)

sitemaps = {
    'boats': BoatSitemap(),
    'static': StaticViewSitemap(),
}

urlpatterns = [
    path('', include(router.urls)),
    path('inquiries/', views.submit_inquiry, name='submit_inquiry'),
    path('sell-requests/', views.submit_sell_request, name='submit_sell_request'),
    path('featured-boats/', views.get_featured_boats, name='featured_boats'),
    # Simplified sitemap configuration
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('sitemap-<section>.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]