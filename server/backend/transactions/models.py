from django.db import models
from django.utils.timezone import now

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
        ('remittance', 'Remittance'),
    ]

    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(default=now)
    description = models.TextField(blank=True, null=True)
    mobile_number = models.CharField(max_length=12, null=True)

    def __str__(self):
        return f"{self.transaction_type.capitalize()} - {self.category}: ${self.amount} by {self.mobile_number}"

