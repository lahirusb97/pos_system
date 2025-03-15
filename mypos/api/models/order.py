from .customer import Customer
from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]

    customer=models.ForeignKey(Customer, on_delete=models.PROTECT)
    sub_total=models.PositiveIntegerField()
    total=models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    discount=models.PositiveIntegerField()
    balance = models.PositiveIntegerField(default=0)  # ✅ Add default
    cost=models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
   
    def __str__(self):
        return self.name