from django.db import models

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('Mountains', 'Mountains'),
        ('Beaches', 'Beaches'),
        ('Wildlife', 'Wildlife'),
        ('Historical Attractions', 'Historical Attractions'),
    ]
    
    name = models.CharField(max_length=100, unique=True, choices=CATEGORY_CHOICES)

    class Meta:
        db_table = "categories"

    def __str__(self):
        return self.name
