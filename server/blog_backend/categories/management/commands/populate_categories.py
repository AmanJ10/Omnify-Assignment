from django.core.management.base import BaseCommand
from categories.models import Category

class Command(BaseCommand):
    help = 'Populate default categories into the database'

    def handle(self, *args, **kwargs):
        default_categories = ['Mountains', 'Beaches', 'Wildlife', 'Historical Attractions']
        for category in default_categories:
            obj, created = Category.objects.get_or_create(name=category)
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created category: {category}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Category already exists: {category}"))
