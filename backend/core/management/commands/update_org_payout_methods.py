from django.core.management.base import BaseCommand
from core.models import Organization

class Command(BaseCommand):
    help = 'Update existing organizations with multiple payout methods'

    def handle(self, *args, **options):
        updates = {
            'Save the Cats Foundation': ['stripe', 'paypal'],
            'Ukrainian Medical Relief': ['crypto', 'wise'],
            'Environmental Conservation Alliance': ['paypal', 'stripe'],
            'Children\'s Hope Initiative': ['wise', 'stripe'],
            'Refugee Support Network': ['stripe', 'paypal', 'wise'],
            'Clean Water Project': ['paypal', 'crypto'],
        }

        for org_name, payout_methods in updates.items():
            try:
                org = Organization.objects.get(name=org_name)
                org.preferred_payout_methods = payout_methods
                org.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Updated {org_name} with payout methods: {payout_methods}')
                )
            except Organization.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(f'Organization not found: {org_name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Successfully updated organization payout methods')
        ) 