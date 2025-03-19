from django.db import models
from django.utils import timezone

class BoatCategory(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom")
    description = models.TextField(blank=True, verbose_name="Description")
    
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
    
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date de création de l'annonce")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour de l'annonce")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    
    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name = "Bateau"
        verbose_name_plural = "Bateaux"

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

class Inquiry(models.Model):
    """For users interested in a specific boat"""
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='inquiries', verbose_name="Bateau")
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    comment = models.TextField(verbose_name="Commentaire")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Date de création")
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