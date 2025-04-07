from categories.models import Category

default_categories = ['Mountains', 'Beaches', 'Wildlife', 'Historical Attractions']

for category in default_categories:
    Category.objects.get_or_create(name=category)


print("Default categories populated successfully.")