from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from .models import (
    Boat, BoatCategory, BoatImage, BoatVideo, Inquiry, 
    SellRequest, SellRequestImage, AmenityItem, TechnicalDetailItem,
    Testimonial, BlogPost, get_storage_info
)

class BoatImageInline(admin.TabularInline):
    model = BoatImage
    extra = 3

class BoatVideoInline(admin.TabularInline):
    model = BoatVideo
    extra = 1
    verbose_name = "Vidéo (facultatif)"
    verbose_name_plural = "Vidéos (facultatif)"
    fields = ('title', 'video_url', 'video_file', 'thumbnail', 'is_main', 'file_size_display', 'warning_display')
    readonly_fields = ('file_size_display', 'warning_display')
    
    def file_size_display(self, obj):
        if obj.file_size_mb:
            storage_info = get_storage_info()
            
            # Choose color based on file size
            color = 'green'
            if obj.file_size_mb > 50:  # Medium size
                color = 'orange'
            if obj.file_size_mb > 100:  # Large size
                color = 'red'
                
            # Pre-format the values outside of format_html
            file_size_str = f"{obj.file_size_mb:.2f}"
            free_space_str = f"{storage_info['free_gb']:.2f}"
                
            return format_html(
                '<span style="color: {};">{} MB</span> '
                '<br/><small>Espace disponible: {} GB</small>',
                color, file_size_str, free_space_str
            )
        elif obj.video_url:
            return format_html('<span style="color: green;">URL externe (recommandé)</span>')
        return '-'
    file_size_display.short_description = "Taille du fichier"
    
    def warning_display(self, obj):
        if obj.warning_message:
            return format_html(
                '<div style="color: orange; background-color: #fff3cd; padding: 8px; border-radius: 4px;">'
                '<strong>Avertissement:</strong><br>{}</div>',
                obj.warning_message.replace('\n', '<br>')
            )
        return ''
    warning_display.short_description = "Avertissements"

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
    list_display = ('title', 'category', 'price', 'year_built', 'location', 'is_active', 'is_featured')
    list_filter = ('category', 'is_active', 'is_featured', 'year_built')
    search_fields = ('title', 'description', 'location')
    inlines = [BoatImageInline, BoatVideoInline, AmenityItemInline, TechnicalDetailItemInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'category', 'description', 'price', 'is_active', 'is_featured')
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

@admin.register(BoatVideo)
class BoatVideoAdmin(admin.ModelAdmin):
    list_display = ('boat', 'title', 'has_video_file', 'has_video_url', 'file_size_display', 'has_warnings')
    list_filter = ('boat',)
    search_fields = ('title', 'boat__title')
    fields = ('boat', 'title', 'video_url', 'video_file', 'thumbnail', 'is_main', 'warning_display', 'storage_info')
    readonly_fields = ('storage_info', 'warning_display')
    change_list_template = 'admin/api_app/boatvideo/change_list.html'
    
    def has_video_file(self, obj):
        return bool(obj.video_file)
    has_video_file.boolean = True
    has_video_file.short_description = "Fichier vidéo"
    
    def has_video_url(self, obj):
        return bool(obj.video_url)
    has_video_url.boolean = True
    has_video_url.short_description = "URL vidéo"
    
    def file_size_display(self, obj):
        if obj.file_size_mb:
            # Choose color based on file size
            color = 'green'
            if obj.file_size_mb > 50:
                color = 'orange'
            if obj.file_size_mb > 100:
                color = 'red'
            # Pre-format the value
            file_size_str = f"{obj.file_size_mb:.2f}"
            return format_html('<span style="color: {};">{} MB</span>', color, file_size_str)
        return '-'
    file_size_display.short_description = "Taille du fichier"
    
    def has_warnings(self, obj):
        return bool(obj.warning_message)
    has_warnings.boolean = True
    has_warnings.short_description = "⚠️"
    
    def warning_display(self, obj):
        if obj.warning_message:
            return format_html(
                '<div style="color: #664d03; background-color: #fff3cd; padding: 10px; '
                'border: 1px solid #ffecb5; border-radius: 4px; margin-bottom: 15px;">'
                '<strong>⚠️ Avertissements:</strong><br>{}</div>',
                obj.warning_message.replace('\n', '<br>')
            )
        return ''
    warning_display.short_description = "Avertissements"
    
    def storage_info(self, obj):
        info = get_storage_info()
        if 'error' in info:
            return format_html('<div style="color: red;">Erreur: {}</div>', info['error'])
            
        # Display storage information with color coding
        color = 'green'
        if info['percent_used'] > 70:
            color = 'orange'
        if info['percent_used'] > 90:
            color = 'red'
            
        # Pre-format all values
        total_gb = f"{info['total_gb']:.2f}"
        used_gb = f"{info['used_gb']:.2f}"
        percent_used = f"{info['percent_used']:.1f}"
        free_gb = f"{info['free_gb']:.2f}"
            
        return format_html(
            '<div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">'
            '<h3 style="margin-top: 0;">Information sur le stockage</h3>'
            '<p><b>Espace total:</b> {} GB</p>'
            '<p><b>Espace utilisé:</b> {} GB (<span style="color: {};">{}</span>%)</p>'
            '<p><b>Espace libre:</b> {} GB</p>'
            '<p style="font-style: italic; margin-top: 15px; font-size: 0.9em;">'
            'Pour les vidéos volumineuses (>100 MB), considérez utiliser YouTube ou Vimeo et fournir l\'URL.</p>'
            '</div>',
            total_gb, used_gb, color, percent_used, free_gb
        )
    storage_info.short_description = "Informations de stockage"
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        # Display warning messages from the model
        if obj.warning_message:
            for warning in obj.warning_message.split('\n'):
                messages.warning(request, warning)
    
    def changelist_view(self, request, extra_context=None):
        """Override to add storage info to the change list view"""
        extra_context = extra_context or {}
        
        info = get_storage_info()
        color = 'green'
        if info['percent_used'] > 70:
            color = 'orange'
        if info['percent_used'] > 90:
            color = 'red'
            
        # Pre-format all values
        total_gb = f"{info['total_gb']:.2f}"
        used_gb = f"{info['used_gb']:.2f}"
        percent_used = f"{info['percent_used']:.1f}"
        free_gb = f"{info['free_gb']:.2f}"
        
        storage_info_html = f"""
        <div style="padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
            <h3 style="margin-top: 0;">Information sur le stockage</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                <div>
                    <p><b>Espace total:</b> {total_gb} GB</p>
                    <p><b>Espace utilisé:</b> {used_gb} GB (<span style="color: {color};">{percent_used}%</span>)</p>
                </div>
                <div>
                    <p><b>Espace libre:</b> {free_gb} GB</p>
                    <p style="font-style: italic; font-size: 0.9em;">
                        Pour les vidéos volumineuses (>100 MB), considérez utiliser YouTube ou Vimeo
                    </p>
                </div>
            </div>
        </div>
        """
        
        extra_context['storage_info_html'] = storage_info_html
        return super().changelist_view(request, extra_context=extra_context)

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_date', 'is_active')
    list_filter = ('is_active', 'published_date')
    search_fields = ('title', 'content')
    fields = ('title', 'content', 'image', 'published_date', 'is_active')
    readonly_fields = ('published_date',)

