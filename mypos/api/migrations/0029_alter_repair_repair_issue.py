# Generated by Django 5.1.6 on 2025-03-14 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_rename_price_repair_total_price_repair_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repair',
            name='repair_issue',
            field=models.CharField(max_length=100),
        ),
    ]
