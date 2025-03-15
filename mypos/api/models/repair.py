from django.db import models
from .customer import Customer

class Repair(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("canceled", "Canceled"),
    ]
    customer=models.ForeignKey(Customer, on_delete=models.PROTECT)
    repair_issue = models.CharField(max_length=100,)  # ✅ Fixed typo
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    note = models.TextField(blank=True, null=True)  # ✅ Changed from choices to TextField
    cost = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    balance = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.repair_issue  # ✅ Fixed return value
