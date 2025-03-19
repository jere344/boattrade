from rest_framework import serializers
from .models import Boat, BoatCategory, BoatImage, Inquiry, SellRequest, SellRequestImage

class BoatCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatCategory
        fields = ['id', 'name', 'description']

class BoatImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoatImage
        fields = ['id', 'image', 'is_main', 'caption']

class BoatSerializer(serializers.ModelSerializer):
    images = BoatImageSerializer(many=True, read_only=True)
    category_detail = BoatCategorySerializer(source='category', read_only=True)

    class Meta:
        model = Boat
        fields = [
            'id', 'title', 'category', 'category_detail', 'description', 
            'price', 'length', 'width', 'year_built', 'engine_power', 
            'fuel_type', 'created_at', 'updated_at', 'is_active', 'images'
        ]

class BoatListSerializer(serializers.ModelSerializer):
    category_detail = BoatCategorySerializer(source='category', read_only=True)
    main_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Boat
        fields = [
            'id', 'title', 'category', 'category_detail', 'price', 
            'year_built', 'main_image'
        ]
    
    def get_main_image(self, obj):
        main_image = obj.images.filter(is_main=True).first()
        if main_image:
            return main_image.image.url
        # Return the first image if no main image is set
        first_image = obj.images.first()
        return first_image.image.url if first_image else None

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            'id', 'boat', 'first_name', 'last_name', 'email', 'comment',
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
