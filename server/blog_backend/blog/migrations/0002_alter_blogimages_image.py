# Generated by Django 5.2 on 2025-04-05 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogimages',
            name='image',
            field=models.URLField(max_length=1000),
        ),
    ]
