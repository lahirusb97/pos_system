# Generated by Django 5.1.6 on 2025-03-11 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_order_sub_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='balance',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]
