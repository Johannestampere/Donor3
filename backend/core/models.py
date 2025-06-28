from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class DonorProfile(models.Model):
    PAYMENT_CHOICES = [
        ("stripe", "Stripe"),
        ("paypal", "PayPal"),
        ("wise", "Wise"),
        ("crypto", "Crypto"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    preferred_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)

    eth_wallet = models.CharField(max_length=200, blank=True, null=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    stripe_payment_method_id = models.CharField(max_length=100, blank=True, null=True)
    paypal_email = models.EmailField(blank=True, null=True)
    wise_account_id = models.CharField(max_length=100, blank=True, null=True)

    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

from django.db import models

class Organization(models.Model):
    PAYMENT_CHOICES = [
        ("stripe", "Stripe"),
        ("paypal", "PayPal"),
        ("wise", "Wise"),
        ("crypto", "Crypto"),
    ]

    name = models.CharField(max_length=150)
    description = models.TextField()
    contact_email = models.EmailField(unique=True)

    tags = models.CharField(max_length=300)

    eth_wallet = models.CharField(max_length=200, blank=True, null=True)
    stripe_account_id = models.CharField(max_length=150, blank=True, null=True)
    paypal_email = models.EmailField(blank=True, null=True)
    wise_account_id = models.CharField(max_length=150, blank=True, null=True)

    preferred_payout_method = models.CharField(
        max_length=10,
        choices=PAYMENT_CHOICES,
        default="stripe"
    )

    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Donation(models.Model):
    CURRENCY_CHOICES = [
        ("USD", "USD"),
        ("CAD", "CAD"),
        ("EUR", "EUR"),
        ("ETH", "ETH"),
        ("BTC", "BTC"),
    ]

    METHOD_CHOICES = [
        ("stripe", "Stripe"),
        ("paypal", "PayPal"),
        ("wise", "Wise"),
        ("crypto", "Crypto"),
    ]

    donor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    amount = models.FloatField()
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)
    method = models.CharField(max_length=10, choices=METHOD_CHOICES)

    # Optional: Transaction IDs
    tx_hash = models.CharField(max_length=150, blank=True, null=True)       # for crypto
    stripe_payment_intent = models.CharField(max_length=150, blank=True, null=True)
    paypal_transaction_id = models.CharField(max_length=150, blank=True, null=True)
    wise_transfer_id = models.CharField(max_length=150, blank=True, null=True)

    # Metadata
    message = models.TextField(blank=True, null=True)  # donor message (e.g., from Gemini input)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} {self.currency} to {self.organization.name}"

