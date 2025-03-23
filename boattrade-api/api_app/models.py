from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.forms import ValidationError as FormValidationError
from django.db.models import JSONField  # Import JSONField for complex data structures
from django.contrib import messages
import os
import shutil

def get_file_size_mb(file):
    """Return file size in MB"""
    if hasattr(file, 'size'):
        return file.size / (1024 * 1024)
    return 0

def get_storage_info():
    """Get storage information for the media directory"""
    try:
        # Get the directory where media is stored (MEDIA_ROOT)
        from django.conf import settings
        media_root = settings.MEDIA_ROOT
        
        # Create the directory if it doesn't exist
        os.makedirs(media_root, exist_ok=True)
        
        # Get disk usage statistics
        total, used, free = shutil.disk_usage(media_root)
        return {
            'total_gb': total / (1024**3),
            'used_gb': used / (1024**3),
            'free_gb': free / (1024**3),
            'free_mb': free / (1024**2),
            'percent_used': (used / total) * 100
        }
    except Exception as e:
        # Return default values in case of error
        return {
            'total_gb': 0,
            'used_gb': 0,
            'free_gb': 0,
            'free_mb': 0,
            'percent_used': 0,
            'error': str(e)
        }

class BoatCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(blank=True, verbose_name="Description")
    image = models.ImageField(upload_to='categories/', blank=True, null=True, verbose_name="Image")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Catégorie de bateau"
        verbose_name_plural = "Catégories de bateaux"

class Boat(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    category = models.ForeignKey(BoatCategory, on_delete=models.CASCADE, related_name='boats', verbose_name="Catégorie")
    description = models.TextField(verbose_name="Description")
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Prix")
    
    # Common boat characteristics
    length = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="Longueur (m)")
    width = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="Largeur (m)")
    year_built = models.IntegerField(null=True, blank=True, verbose_name="Année de construction")
    engine_power = models.CharField(max_length=100, null=True, blank=True, verbose_name="Puissance moteur")
    fuel_type = models.CharField(max_length=50, null=True, blank=True, verbose_name="Type de carburant")
    
    # Optional new field
    location = models.CharField(max_length=200, blank=True, null=True, verbose_name="Localisation")
    
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date de création de l'annonce")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour de l'annonce")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    is_featured = models.BooleanField(default=False, verbose_name="Mise en avant")
    
    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name = "Bateau"
        verbose_name_plural = "Bateaux"

# New models for amenities and technical details - fully optional
class AmenityItem(models.Model):
    CATEGORY_CHOICES = [
        ('interior', 'Intérieur'),
        ('exterior', 'Extérieur'),
    ]
    
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='amenity_items', verbose_name="Bateau")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Catégorie")
    name = models.CharField(max_length=100, verbose_name="Équipement")
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
    
    class Meta:
        verbose_name = "Équipement (facultatif)"
        verbose_name_plural = "Équipements (facultatif)"

class TechnicalDetailItem(models.Model):
    CATEGORY_CHOICES = [
        ('electricity_equipment', 'Électricité / Annexe'),
        ('rigging_sails', 'Accastillage / Voiles'),
        ('electronics', 'Électronique'),
    ]
    
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='technical_detail_items', verbose_name="Bateau")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="Catégorie")
    name = models.CharField(max_length=100, verbose_name="Nom")
    value = models.CharField(max_length=200, verbose_name="Valeur")
    
    def __str__(self):
        return f"{self.name}: {self.value} ({self.get_category_display()})"
    
    class Meta:
        verbose_name = "Détail technique (facultatif)"
        verbose_name_plural = "Détails techniques (facultatif)"

class BoatImage(models.Model):
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='images', verbose_name="Bateau")
    image = models.ImageField(upload_to='boats/', verbose_name="Image")
    is_main = models.BooleanField(default=False, verbose_name="Image principale")
    caption = models.CharField(max_length=200, blank=True, verbose_name="Légende")
    
    def __str__(self):
        return f"Image for {self.boat.title}"
        
    class Meta:
        verbose_name = "Image de bateau"
        verbose_name_plural = "Images de bateaux"

class BoatVideo(models.Model):
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='videos', verbose_name="Bateau")
    title = models.CharField(max_length=200, blank=True, verbose_name="Titre")
    video_url = models.URLField(verbose_name="URL Vidéo", help_text="YouTube ou Vimeo URL", blank=True, null=True)
    video_file = models.FileField(upload_to='boat_videos/', blank=True, null=True, verbose_name="Fichier Vidéo",
                                 help_text="Téléchargez directement un fichier vidéo (recommandé < 100 MB)")
    thumbnail = models.ImageField(upload_to='boat_video_thumbnails/', blank=True, null=True, verbose_name="Miniature")
    is_main = models.BooleanField(default=False, verbose_name="Vidéo principale")
    file_size_mb = models.FloatField(blank=True, null=True, editable=False, verbose_name="Taille du fichier (MB)")
    warning_message = models.TextField(blank=True, null=True, editable=False, 
                                       verbose_name="Message d'avertissement")
    
    def __str__(self):
        return f"Vidéo pour {self.boat.title}: {self.title}"
    
    def clean(self):
        # Ensure at least one of video_url or video_file is provided
        if not self.video_url and not self.video_file:
            raise ValidationError("Either a video URL or a video file must be provided.")
        
        # Reset warning message
        self.warning_message = None
        
        # Check video file size and available storage
        if self.video_file:
            file_size_mb = get_file_size_mb(self.video_file)
            storage_info = get_storage_info()
            
            # Store the file size for reference
            self.file_size_mb = file_size_mb
            
            remaining_space_after_upload = storage_info['free_mb'] - file_size_mb
            
            # Critical warning - block the upload if less than 1GB would remain
            if remaining_space_after_upload < 1024:  # 1GB in MB
                raise ValidationError(
                    f"Ce fichier est trop volumineux pour l'espace disponible. Il ne resterait que "
                    f"{remaining_space_after_upload:.2f} MB après téléchargement. Veuillez libérer "
                    f"de l'espace ou utiliser une URL YouTube/Vimeo."
                )
            
            # Set warning messages but don't block upload
            warnings = []
            
            # Warn about large files
            if file_size_mb > 100:  # 100 MB warning threshold
                warnings.append(
                    f"Le fichier vidéo est très volumineux ({file_size_mb:.2f} MB). "
                    f"Considérez l'utilisation d'un lien YouTube ou Vimeo pour de meilleures performances."
                )
                                      
            # Warn about storage space
            if file_size_mb > storage_info['free_mb'] * 0.3:  # If file will use more than 30% of available space
                warnings.append(
                    f"Attention: Ce fichier utiliserait {(file_size_mb / storage_info['free_mb'] * 100):.1f}% "
                    f"de votre espace de stockage disponible ({storage_info['free_gb']:.2f} GB)."
                )
            
            # Store warnings for display in the admin
            if warnings:
                self.warning_message = "\n".join(warnings)
    
    def save(self, *args, **kwargs):
        # Calculate and save file size when saving
        if self.video_file and not self.file_size_mb:
            self.file_size_mb = get_file_size_mb(self.video_file)
        super().save(*args, **kwargs)
        
    class Meta:
        verbose_name = "Vidéo de bateau"
        verbose_name_plural = "Vidéos de bateaux"

class Inquiry(models.Model):
    """For users interested in a specific boat"""
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='inquiries', verbose_name="Bateau")
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    comment = models.TextField(verbose_name="Commentaire")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date de création")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Téléphone")
    is_processed = models.BooleanField(default=False, verbose_name="Traité")
    
    def __str__(self):
        return f"Inquiry about {self.boat.title} from {self.first_name} {self.last_name}"
    
    class Meta:
        verbose_name = "Demande d'information"
        verbose_name_plural = "Demandes d'information"

class SellRequest(models.Model):
    """For users wanting to sell their boat"""
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Téléphone")
    boat_details = models.TextField(help_text="Description of the boat being sold", verbose_name="Détails du bateau")
    comment = models.TextField(blank=True, verbose_name="Commentaire")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date de création")
    is_processed = models.BooleanField(default=False, verbose_name="Traité")
    
    def __str__(self):
        return f"Sell request from {self.first_name} {self.last_name}"
        
    class Meta:
        verbose_name = "Demande de mise en vente"
        verbose_name_plural = "Demandes de mise en vente"

class SellRequestImage(models.Model):
    sell_request = models.ForeignKey(SellRequest, on_delete=models.CASCADE, related_name='images', verbose_name="Demande de vente")
    image = models.ImageField(upload_to='sell_requests/', verbose_name="Image")
    
    def __str__(self):
        return f"Image for sell request #{self.sell_request.id}"
        
    class Meta:
        verbose_name = "Image de demande de vente"
        verbose_name_plural = "Images de demandes de vente"

class Testimonial(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom")
    role = models.CharField(max_length=100, verbose_name="Rôle")
    avatar = models.ImageField(upload_to='testimonials/', verbose_name="Avatar")
    quote = models.TextField(verbose_name="Citation")
    rating = models.IntegerField(
        verbose_name="Note", 
        choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')],
        default=5
    )
    
    def __str__(self):
        return f"Témoignage de {self.name}"
    
    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"

class BlogPost(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    content = models.TextField(verbose_name="Contenu")
    image = models.ImageField(upload_to='blog/', blank=True, null=True, verbose_name="Image")
    published_date = models.DateTimeField(default=timezone.now, verbose_name="Date de publication")
    is_active = models.BooleanField(default=True, verbose_name="Publié")
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Article de blog"
        verbose_name_plural = "Articles de blog"
        ordering = ['-published_date']