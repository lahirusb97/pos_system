from django.db import models
from .product import Product
from .customer import Customer
class Order(models.Model):
    customer=models.ForeignKey(Customer, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    grand_total = models.PositiveIntegerField(default=0)
    discount = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"Order {self.id}"
    def calculate_grand_total(self):
        """Calculate the grand total after applying the discount."""
        total_price = sum(item.total_price() for item in self.order_products.all())  # Get the total price of all products
        return total_price - self.discount  # Apply discount
    

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_products")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        """Auto-set price from product price."""
        if not self.price:
            self.price = self.product.normal_price * self.quantity
        super().save(*args, **kwargs)

    def total_price(self):
        """Calculate total price for this product in the order."""
        return self.price * self.quantity

    def __str__(self):
        return f"Order {self.order.id} - {self.product.name} (x{self.quantity})"