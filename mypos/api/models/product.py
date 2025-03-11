from django.db import models
from .category import Category  # Import Category model


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT)  # FK to Category
    name = models.CharField(max_length=200)  # Product name
    normal_price = models.PositiveIntegerField()  # Normal price
    max_price = models.PositiveIntegerField()  # Max price
    qty = models.PositiveIntegerField()  # Stock quantity
    note = models.CharField(max_length=200,blank=True)  # Auto timestamp
    created_at = models.DateTimeField(auto_now_add=True)  # Auto timestamp
    cost = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} "
