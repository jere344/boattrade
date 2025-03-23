from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Q

from .models import Boat, BoatCategory, BoatImage, Inquiry, SellRequest, SellRequestImage, Testimonial, BlogPost
from .serializers import (
    BoatSerializer, BoatCategorySerializer, 
    InquirySerializer, SellRequestSerializer, BoatListSerializer,
    TestimonialSerializer, BlogPostSerializer
)

# Public endpoints for visitors
class BoatCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint to view boat categories"""
    queryset = BoatCategory.objects.all()
    serializer_class = BoatCategorySerializer
    permission_classes = [AllowAny]

class BoatViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for listing and retrieving boats"""
    queryset = Boat.objects.filter(is_active=True).order_by('-created_at')
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return BoatListSerializer
        if self.action == 'retrieve':
            return BoatSerializer
        return BoatSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Apply filters if provided
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        min_year = self.request.query_params.get('min_year')
        max_year = self.request.query_params.get('max_year')
        
        if category:
            queryset = queryset.filter(category_id=category)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search)
            )
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        if min_year:
            queryset = queryset.filter(year_built__gte=min_year)
        if max_year:
            queryset = queryset.filter(year_built__lte=max_year)
            
        return queryset

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_inquiry(request):
    """API endpoint for submitting an inquiry about a boat"""
    serializer = InquirySerializer(data=request.data)
    
    if serializer.is_valid():
        # Check if the boat exists and is active
        boat_id = request.data.get('boat')
        boat = get_object_or_404(Boat, pk=boat_id, is_active=True)
        
        inquiry = serializer.save()
        
        # Send email notification to admin
        subject = f"New Inquiry: {boat.title}"
        message = f"""
        Someone is interested in {boat.title}!
        
        From: {inquiry.first_name} {inquiry.last_name}
        Email: {inquiry.email}
        Phone: {inquiry.phone or 'Not provided'}
        
        Message:
        {inquiry.comment}
        """
        try:
            print("Sending email")
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
            print("Email sent")
        except Exception as e:
            print(f"Error sending email: {e}")
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_sell_request(request):
    """API endpoint for submitting a request to sell a boat"""
    serializer = SellRequestSerializer(data=request.data)
    
    if serializer.is_valid():
        sell_request = serializer.save()
        
        # Handle uploaded images
        if 'images' in request.FILES:
            images = request.FILES.getlist('images')
            for image in images:
                SellRequestImage.objects.create(
                    sell_request=sell_request,
                    image=image
                )
        
        # Send email notification to admin
        subject = "New Boat Selling Request"
        message = f"""
        Someone wants to sell their boat!
        
        From: {sell_request.first_name} {sell_request.last_name}
        Email: {sell_request.email}
        Phone: {sell_request.phone}
        
        Boat Details:
        {sell_request.boat_details}
        
        Additional Comments:
        {sell_request.comment}
        """
        try:
            print("Sending email")
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending email: {e}")
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint to view testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint to view blog posts"""
    queryset = BlogPost.objects.filter(is_active=True).order_by('-published_date')
    serializer_class = BlogPostSerializer
    permission_classes = [AllowAny]
