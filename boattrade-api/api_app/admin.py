from django.contrib import admin
from .models import Boat, BoatCategory, BoatImage, Inquiry, SellRequest, SellRequestImage

class BoatImageInline(admin.TabularInline):
    model = BoatImage
    extra = 3

@admin.register(Boat)
class BoatAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'year_built', 'is_active')
    list_filter = ('category', 'is_active', 'year_built')
    search_fields = ('title', 'description')
    inlines = [BoatImageInline]

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

