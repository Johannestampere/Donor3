import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from .models import Organization
from django.db.models import QuerySet

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@csrf_exempt
def handle_donation_message(request):
    if request.method != "POST":
        return JsonResponse({"error": "the method is not POST"}, status=405)

    try:
        body = json.loads(request.body)
        message = body.get("message", "")
        if not message:
            return JsonResponse({"error": "Missing 'message' field"}, status=400)
    
        prompt = f"""Extract the intent of this donation request:
        Message: "{message}"
        Return JSON with: amount, currency, and keywords.
        Example response: {{ "amount": 100, "currency": "USD", "keywords": ["cats", "refugee"] }}
        """

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ]
        }

        gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        headers = { "Content-Type": "application/json" }
        params = { "key": GEMINI_API_KEY }

        response = requests.post(gemini_url, headers=headers, params=params, json=payload)
        gemini_data = response.json()

        text = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(text)

        amount = parsed.get("amount", 50)
        currency = parsed.get("currency", "USD")
        keywords = parsed.get("keywords", [])

        if not keywords:
            return JsonResponse({"error": "No keywords extracted from message."}, status=400)

        matched_orgs: QuerySet = (
            Organization.objects  # type: ignore
            .filter(is_verified=True)
            .filter(tags__icontains=keywords[0])
            .all()[:3]
        )

        if not matched_orgs:
            return JsonResponse({"error": "No matching organizations found"}, status=404)

        split_amount = round(amount / len(matched_orgs), 2)

        org_list = []
        
        for org in matched_orgs:
            org_list.append({
                "id": org.id,
                "name": org.name,
                "description": org.description,
                "preferred_payout_method": org.preferred_payout_method,
                "amount": split_amount,
            })

        return JsonResponse({
            "organizations": org_list,
            "amount": amount,
            "currency": currency,
            "summary": f"You’re donating {amount} {currency} split across {len(org_list)} verified organizations.",
            "message": "Donation intent parsed and matches found."
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
