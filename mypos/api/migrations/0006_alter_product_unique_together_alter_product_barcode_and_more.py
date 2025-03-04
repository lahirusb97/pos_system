# Generated by Django 5.1.6 on 2025-03-01 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_product_variant_alter_product_barcode_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='product',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='product',
            name='barcode',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.RemoveField(
            model_name='product',
            name='variant',
        ),
    ]
