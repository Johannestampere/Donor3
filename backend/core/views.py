import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from dotenv import load_dotenv
from .models import Organization
from django.db.models import QuerySet

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env'))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@csrf_exempt
def handle_donation_message(request):
    if request.method != "POST":
        return JsonResponse({"error": "the method is not POST"}, status=405)

    try:

        if not GEMINI_API_KEY:
            return JsonResponse({"error": "GEMINI_API_KEY not found in environment variables"}, status=500)
        
        body = json.loads(request.body)
        message = body.get("message", "")
        if not message:
            return JsonResponse({"error": "Missing 'message' field"}, status=400)
    
        prompt = f"""Extract the intent of this donation request:
        Message: "{message}"
        
        Return JSON with: amount, currency, and keywords.
        
        IMPORTANT: Extract simple, general keywords that would match charity categories. 
        - Use single words or short phrases (2-3 words max)
        - Focus on the main cause/issue, not specific details
        - Examples: "cats" not "cat rescue", "toronto" not "Toronto-based charities", "hospitals" not "Ukrainian hospitals"
        
        Example response: {{ "amount": 100, "currency": "USD", "keywords": ["cats", "animals", "estonia"] }}
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
        
        if response.status_code != 200:
            return JsonResponse({"error": f"Gemini API error: {response.status_code} - {response.text}"}, status=500)
        
        print(f"Gemini response status: {response.status_code}")
        print(f"Gemini response text: {response.text}")
            
        gemini_data = response.json()

        text = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
        
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()
        
        parsed = json.loads(text)

        amount = parsed.get("amount", 50)
        currency = parsed.get("currency", "USD")
        keywords = parsed.get("keywords", [])

        if not keywords:
            return JsonResponse({"error": "No keywords extracted from message."}, status=400)

        matched_orgs = None
        for keyword in keywords:
            matched_orgs = (
                Organization.objects  # type: ignore
                .filter(is_verified=True)
                .filter(tags__icontains=keyword.lower())
                .all()[:3]
            )
            if matched_orgs:
                break

        if not matched_orgs:
            return JsonResponse({
                "error": "No matching organizations found for your request. Try different keywords or a broader cause.",
                "message": "No matches found"
            }, status=200)

        split_amount = round(amount / len(matched_orgs), 2)

        org_list = []
        
        for org in matched_orgs:
            org_list.append({
                "id": org.id,
                "name": org.name,
                "description": org.description,
                "preferred_payout_methods": org.preferred_payout_methods,
                "primary_payout_method": org.get_primary_payout_method(),
                "amount": split_amount,
            })

        return JsonResponse({
            "organizations": org_list,
            "amount": amount,   
            "currency": currency,
            "user_payout_method": "paypal",
            "user_account": "tamperejohannes@gmail.com",
            "account_status": "Connected",
            "user_balance": 3278.91,
            "summary": f"You're donating {amount} {currency} split across {len(org_list)} verified organizations.",
            "message": "Donation intent parsed and matches found."
        })

    except Exception as e:
        import traceback
        return JsonResponse({"error": f"Server error: {str(e)}", "traceback": traceback.format_exc()}, status=500)
