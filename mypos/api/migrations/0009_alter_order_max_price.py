# Generated by Django 5.1.6 on 2025-03-01 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_invoice_paid_amount_alter_invoice_total_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='max_price',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
