from django.contrib import admin
from .models import (
    Boat, BoatCategory, BoatImage, Inquiry, 
    SellRequest, SellRequestImage, AmenityItem, TechnicalDetailItem,
    Testimonial
)

class BoatImageInline(admin.TabularInline):
    model = BoatImage
    extra = 3

class AmenityItemInline(admin.TabularInline):
    model = AmenityItem
    extra = 1  # Reduced from 3 to make it less prominent
    verbose_name = "Équipement (facultatif)"
    verbose_name_plural = "Équipements (facultatif)"
    fields = ('category', 'name')

class TechnicalDetailItemInline(admin.TabularInline):
    model = TechnicalDetailItem
    extra = 1  # Reduced from 3 to make it less prominent
    verbose_name = "Détail technique (facultatif)"
    verbose_name_plural = "Détails techniques (facultatif)"
    fields = ('category', 'name', 'value')

@admin.register(Boat)
class BoatAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'year_built', 'location', 'is_active')
    list_filter = ('category', 'is_active', 'year_built')
    search_fields = ('title', 'description', 'location')
    inlines = [BoatImageInline, AmenityItemInline, TechnicalDetailItemInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'category', 'description', 'price', 'is_active')
        }),
        ('Caractéristiques', {
            'fields': ('length', 'width', 'year_built', 'engine_power', 'fuel_type')
        }),
        ('Informations supplémentaires (facultatif)', {
            'fields': ('location',),
            'classes': ('collapse',),
            'description': "Ces champs sont optionnels et peuvent être laissés vides."
        }),
    )

@admin.register(BoatCategory)
class BoatCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name', 'description')

class SellRequestImageInline(admin.TabularInline):
    model = SellRequestImage
    extra = 1

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('boat', 'first_name', 'last_name', 'email', 'created_at', 'is_processed')
    list_filter = ('is_processed', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'comment')
    readonly_fields = ('created_at',)
    
    def mark_as_processed(self, request, queryset):
        queryset.update(is_processed=True)
    mark_as_processed.short_description = "Mark selected inquiries as processed"
    
    actions = ['mark_as_processed']

@admin.register(SellRequest)
class SellRequestAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'created_at', 'is_processed')
    list_filter = ('is_processed', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'boat_details', 'comment')
    readonly_fields = ('created_at',)
    inlines = [SellRequestImageInline]
    
    def mark_as_processed(self, request, queryset):
        queryset.update(is_processed=True)
    mark_as_processed.short_description = "Mark selected sell requests as processed"
    
    actions = ['mark_as_processed']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating')
    search_fields = ('name', 'role', 'quote')
    list_filter = ('rating',)

