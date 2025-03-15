from django.db import models
from ..models import Order,Product
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items") 
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)  
    quantity = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    product_name = models.CharField(max_length=255, blank=True)  # ✅ Store product name
    def save(self, *args, **kwargs):
        if self.product and not self.product_name:
            self.product_name = self.product.name  # ✅ Store product name before save
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"