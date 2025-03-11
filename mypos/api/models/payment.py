from django.db import models
from .order import Order
class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} - {self.amount}"
class OrderPayment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_payments')  # Add related_name
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

