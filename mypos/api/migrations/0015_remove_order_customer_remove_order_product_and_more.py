# Generated by Django 5.1.6 on 2025-03-01 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_invoice_product_remove_invoice_total_amount_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='order',
            name='product',
        ),
        migrations.DeleteModel(
            name='Invoice',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
    ]
