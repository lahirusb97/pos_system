from django.db import models
from .order import Order
class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='payments')
    amount = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)