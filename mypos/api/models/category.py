from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        
        return self.name
    
