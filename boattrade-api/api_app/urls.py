from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'boats', views.BoatViewSet)
router.register(r'categories', views.BoatCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('inquiries/', views.submit_inquiry, name='submit_inquiry'),
    path('sell-requests/', views.submit_sell_request, name='submit_sell_request'),
]