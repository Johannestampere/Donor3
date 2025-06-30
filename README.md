# Donor3

## Challenges we ran into

During development, we encountered several technical challenges that required creative solutions. Integrating the Gemini API for donation intent extraction proved complex, as the AI responses often included markdown formatting that needed to be stripped before JSON parsing. We also faced challenges with environment variable loading in Django, requiring us to properly configure the dotenv path to load API keys from the project root. The organization matching algorithm needed multiple iterations to handle keyword variations effectively, and we had to redesign the UI several times to balance functionality with user experience, particularly around the payment methods display and navigation layout.

