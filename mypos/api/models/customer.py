from django.db import models
import re
from django.utils.translation import gettext_lazy as _


class Coustomer(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    