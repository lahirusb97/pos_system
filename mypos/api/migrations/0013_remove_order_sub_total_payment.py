# Generated by Django 5.1.6 on 2025-03-01 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_order_sub_total_payment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='sub_total_payment',
        ),
    ]
