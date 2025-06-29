from django.core.management.base import BaseCommand
from core.models import Organization

class Command(BaseCommand):
    help = 'Populate database with demo organizations'

    def handle(self, *args, **options):
        demo_orgs = [
            {
                'name': 'Save the Cats Foundation',
                'description': 'Dedicated to rescuing and caring for stray and abandoned cats. We provide medical care, shelter, and find loving homes for cats in need.',
                'contact_email': 'info@savethecats.org',
                'tags': 'cats, animals, rescue, pets, veterinary',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Ukrainian Medical Relief',
                'description': 'Providing critical medical supplies and support to hospitals and healthcare workers in Ukraine during the ongoing crisis.',
                'contact_email': 'help@ukrainianmedical.org',
                'tags': 'ukrainian, hospitals, medical, crisis, healthcare, ukraine',
                'preferred_payout_methods': ['crypto', 'wise'],
                'is_verified': True
            },
            {
                'name': 'Environmental Conservation Alliance',
                'description': 'Working to protect endangered ecosystems and wildlife through conservation projects, education, and advocacy.',
                'contact_email': 'contact@envconservation.org',
                'tags': 'environmental, conservation, wildlife, nature, climate',
                'preferred_payout_methods': ['paypal', 'stripe'],
                'is_verified': True
            },
            {
                'name': 'Children\'s Hope Initiative',
                'description': 'Supporting children in need through education, healthcare, and basic necessities. We work in underserved communities worldwide.',
                'contact_email': 'info@childrenshope.org',
                'tags': 'children, education, healthcare, poverty, kids',
                'preferred_payout_methods': ['wise', 'stripe'],
                'is_verified': True
            },
            {
                'name': 'Refugee Support Network',
                'description': 'Providing essential services and support to refugees and displaced persons, including shelter, food, and integration assistance.',
                'contact_email': 'help@refugeesupport.org',
                'tags': 'refugee, displaced, shelter, food, integration, crisis',
                'preferred_payout_methods': ['stripe', 'paypal', 'wise'],
                'is_verified': True
            },
            {
                'name': 'Clean Water Project',
                'description': 'Building wells and water purification systems in communities without access to clean drinking water.',
                'contact_email': 'info@cleanwater.org',
                'tags': 'water, wells, purification, infrastructure, health',
                'preferred_payout_methods': ['paypal', 'crypto'],
                'is_verified': True
            },
            {
                'name': 'Toronto Wildlife Rescue',
                'description': 'Rescuing and rehabilitating injured and orphaned wildlife in the Greater Toronto Area. We aim to release them back into their natural habitat.',
                'contact_email': 'info@torontowildliferescue.org',
                'tags': 'wildlife, animals, rescue, toronto, nature',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Downtown Toronto Homeless Aid',
                'description': 'Providing food, shelter, and mental health services to unhoused individuals in Toronto\'s downtown core.',
                'contact_email': 'support@dthomelessaid.ca',
                'tags': 'homeless, toronto, shelter, food, support, housing',
                'preferred_payout_methods': ['stripe', 'wise'],
                'is_verified': True
            },
            {
                'name': 'Green Toronto Initiative',
                'description': 'Fighting climate change through urban tree planting, green roofs, and renewable energy advocacy in Toronto.',
                'contact_email': 'green@toronto.ca',
                'tags': 'environment, climate, trees, green, renewable, toronto',
                'preferred_payout_methods': ['paypal', 'crypto'],
                'is_verified': True
            },
            {
                "name": "Toronto Animal Shelter",
                "description": "Rescuing and caring for animals in need, providing shelter, medical care, and finding loving homes for pets.",
                "contact_email": "info@torontoanimalshelter.org",
                "tags": "animals, rescue, pets, veterinary, toronto, cat, cats",
                "preferred_payout_methods": ["stripe", "paypal"],
                "is_verified": True
            },
            {
                "name": "Montreal Cat Rescue",
                "description": "Dedicated to saving abandoned and stray cats across Montreal, providing emergency medical care, rehabilitation, and adoption services to give every cat a second chance at life.",
                "contact_email": "info@montrealcatrescue.org",
                "tags": "cats, animals, rescue, pets, veterinary, montreal, cat, cats",
                "preferred_payout_methods": ["stripe", "paypal"],
                "is_verified": True
            },
            {
                'name': 'Toronto Youth Empowerment',
                'description': 'Supporting marginalized youth in Toronto with mentorship, education, and employment readiness programs.',
                'contact_email': 'hello@tyeprogram.org',
                'tags': 'youth, education, empowerment, employment, toronto',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'TechAccess Toronto',
                'description': 'Bridging the digital divide by providing free laptops, internet access, and coding workshops to underserved communities in Toronto.',
                'contact_email': 'access@techaccess.ca',
                'tags': 'technology, access, internet, coding, education, toronto',
                'preferred_payout_methods': ['wise', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Feeding Toronto Families',
                'description': 'Delivering fresh groceries and cooked meals to low-income families across the city.',
                'contact_email': 'info@feedto.ca',
                'tags': 'food, families, hunger, groceries, toronto, community',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Toronto Indigenous Support Network',
                'description': 'Empowering Indigenous communities in Toronto through cultural programs, housing support, and legal aid.',
                'contact_email': 'connect@torontoindigenous.org',
                'tags': 'indigenous, support, housing, culture, legal, toronto',
                'preferred_payout_methods': ['paypal', 'crypto'],
                'is_verified': True
            },
            {
                'name': 'Women\'s Safety Alliance Toronto',
                'description': 'Offering safe housing, legal help, and therapy for women escaping violence in Toronto.',
                'contact_email': 'safety@wsatoronto.org',
                'tags': 'women, safety, shelter, violence, legal, toronto',
                'preferred_payout_methods': ['wise', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Toronto Immigrant Resource Centre',
                'description': 'Helping new immigrants settle in Toronto through job placement, language classes, and legal support.',
                'contact_email': 'welcome@tirc.ca',
                'tags': 'immigration, jobs, settlement, canada, toronto, language',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'The Toronto Literacy Fund',
                'description': 'Promoting literacy in low-income neighborhoods through tutoring and book drives.',
                'contact_email': 'books@torontoliteracyfund.ca',
                'tags': 'literacy, education, reading, tutoring, toronto, books',
                'preferred_payout_methods': ['paypal', 'stripe'],
                'is_verified': True
            },
            {
                'name': 'Healthcare for All Toronto',
                'description': 'Running free health clinics and mobile care units for uninsured residents in Toronto.',
                'contact_email': 'care@healthforall.ca',
                'tags': 'healthcare, free clinics, uninsured, medical, toronto',
                'preferred_payout_methods': ['paypal', 'stripe', 'wise'],
                'is_verified': True
            },
            {
                'name': 'Toronto Seniors Support Circle',
                'description': 'Supporting elderly residents through check-ins, meal delivery, and mobility services.',
                'contact_email': 'support@torontoseniors.org',
                'tags': 'seniors, elderly, mobility, food, toronto, support',
                'preferred_payout_methods': ['paypal', 'stripe'],
                'is_verified': True
            },
            {
                'name': 'Toronto LGBTQ+ Youth Shelter',
                'description': 'Providing shelter, safety, and resources to LGBTQ+ youth experiencing homelessness.',
                'contact_email': 'shelter@lgbtqtoronto.org',
                'tags': 'lgbtq, youth, shelter, inclusion, toronto, safety',
                'preferred_payout_methods': ['paypal', 'wise'],
                'is_verified': True
            },
            {
                'name': 'Clean Streets Toronto',
                'description': 'Organizing community clean-ups, waste education, and recycling programs across the GTA.',
                'contact_email': 'clean@streets.to',
                'tags': 'waste, clean, community, recycling, toronto',
                'preferred_payout_methods': ['stripe', 'paypal'],
                'is_verified': True
            },
            {
                'name': 'Toronto Art for Change',
                'description': 'Supporting local artists and running community art programs for healing and activism.',
                'contact_email': 'art@change.to',
                'tags': 'art, community, healing, activism, toronto',
                'preferred_payout_methods': ['stripe', 'crypto'],
                'is_verified': True
            }

        ]

        created_count = 0
        updated_count = 0
        for org_data in demo_orgs:
            org, created = Organization.objects.update_or_create(
                contact_email=org_data['contact_email'],
                defaults=org_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created organization: {org.name}')
                )
            else:
                updated_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Updated organization: {org.name}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {created_count} new organizations and updated {updated_count} existing organizations')
        ) 