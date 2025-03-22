from rest_framework import serializers
from .models import (
    Boat, BoatCategory, BoatImage, BoatVideo, Inquiry, 
    SellRequest, SellRequestImage, AmenityItem, TechnicalDetailItem,
    Testimonial
)

class BoatCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatCategory
        fields = ['id', 'name', 'description', 'image']

class BoatImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatImage
        fields = ['id', 'image', 'is_main', 'caption']

class BoatVideoSerializer(serializers.ModelSerializer):
    video_file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BoatVideo
        fields = ['id', 'title', 'video_url', 'video_file', 'video_file_url', 'thumbnail', 'is_main']
    
    def get_video_file_url(self, obj):
        if obj.video_file:
            return obj.video_file.url
        return None

class BoatSerializer(serializers.ModelSerializer):
    images = BoatImageSerializer(many=True, read_only=True)
    videos = BoatVideoSerializer(many=True, read_only=True)
    category_detail = BoatCategorySerializer(source='category', read_only=True)
    amenities = serializers.SerializerMethodField()
    technical_details = serializers.SerializerMethodField()

    class Meta:
        model = Boat
        fields = [
            'id', 'title', 'category', 'category_detail', 'description', 
            'price', 'length', 'width', 'year_built', 'engine_power', 
            'fuel_type', 'created_at', 'updated_at', 'is_active', 'images',
            'videos', 'location', 'amenities', 'technical_details'
        ]
    
    def get_amenities(self, obj):
        # Format amenities as expected by frontend
        amenity_items = obj.amenity_items.all()
        
        # Return None if no amenities exist
        if not amenity_items.exists():
            return None
            
        result = {
            'interior': [],
            'exterior': []
        }
        
        for item in amenity_items:
            if item.category == 'interior':
                result['interior'].append(item.name)
            elif item.category == 'exterior':
                result['exterior'].append(item.name)
        
        # Return None if both lists are empty
        if not result['interior'] and not result['exterior']:
            return None
                
        return result
    
    def get_technical_details(self, obj):
        # Format technical details as expected by frontend
        detail_items = obj.technical_detail_items.all()
        
        # Return None if no technical details exist
        if not detail_items.exists():
            return None
            
        result = {
            'electricity_equipment': [],
            'rigging_sails': [],
            'electronics': []
        }
        
        for item in detail_items:
            category = item.category
            if category in result:
                result[category].append({
                    'name': item.name,
                    'value': item.value
                })
        
        # Return None if all categories are empty
        if not any(result.values()):
            return None
                
        return result

class BoatListSerializer(serializers.ModelSerializer):
    category_detail = BoatCategorySerializer(source='category', read_only=True)
    main_image = serializers.SerializerMethodField()
    main_video = serializers.SerializerMethodField()
    
    class Meta:
        model = Boat
        fields = [
            'id', 'title', 'category', 'category_detail', 'price', 
            'year_built', 'main_image', 'main_video', 'location'
        ]
    
    def get_main_image(self, obj):
        main_image = obj.images.filter(is_main=True).first()
        if (main_image):
            return main_image.image.url
        # Return the first image if no main image is set
        first_image = obj.images.first()
        return first_image.image.url if first_image else None
    
    def get_main_video(self, obj):
        main_video = obj.videos.filter(is_main=True).first()
        if main_video:
            if main_video.video_file:
                return main_video.video_file.url
            return main_video.video_url
        return None

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            'id', 'boat', 'first_name', 'last_name', 'email', 'phone', 'comment',
            'created_at', 'is_processed'
        ]
        read_only_fields = ['id', 'created_at', 'is_processed']

class SellRequestImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellRequestImage
        fields = ['id', 'image']

class SellRequestSerializer(serializers.ModelSerializer):
    images = SellRequestImageSerializer(many=True, read_only=True)

    class Meta:
        model = SellRequest
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone',
            'boat_details', 'comment', 'created_at', 'is_processed', 'images'
        ]
        read_only_fields = ['id', 'created_at', 'is_processed', 'images']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'avatar', 'quote', 'rating']
