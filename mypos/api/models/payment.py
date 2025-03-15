from django.db import models
from .order import Order
from .repair import Repair
class Payment(models.Model):
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name='orders',
        null=True,  # ✅ Allows NULL values
        blank=True  # ✅ Allows empty values in forms
    )
    repair = models.ForeignKey(
        Repair, 
        on_delete=models.CASCADE, 
        related_name='repair',
        null=True,  # ✅ Allows NULL values
        blank=True  # ✅ Allows empty values in forms
    )
    amount = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)