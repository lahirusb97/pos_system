# Generated by Django 5.1.6 on 2025-03-11 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_orderitem_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='product_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
