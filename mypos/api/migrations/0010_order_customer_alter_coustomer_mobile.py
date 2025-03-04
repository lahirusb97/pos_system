# Generated by Django 5.1.6 on 2025-03-01 09:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_order_max_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.coustomer'),
        ),
        migrations.AlterField(
            model_name='coustomer',
            name='mobile',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
