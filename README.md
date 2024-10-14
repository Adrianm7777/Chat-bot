Chatbot Application
A simple chatbot built using Django (backend) and Next.js (frontend) with GPT-2 for generating responses.

Features
Ask questions and receive AI-generated answers
Django API with GPT-2 integration
Next.js frontend
Prerequisites
Python 3.9+
Node.js 14+

Setup
Backend (Django)

Clone the repo:
git clone https://github.com/yourusername/chatbot-project.git
cd chatbot-project/backend

Set up environment and install dependencies:
python -m venv venv
source venv/bin/activate  # Windows: `venv\Scripts\activate`
pip install -r requirements.txt
Run migrations and start server:


python manage.py migrate
python manage.py runserver
Frontend (Next.js)
Navigate to the frontend:


cd ../frontend
npm install
npm run dev

Usage
Access the frontend at http://localhost:3000.
Enter a question and click "Ask" to get a response from the chatbot.

API
POST /api/chatbot/ask/: Send a question and receive a response.

Example:
json
{
  "question": "What's the weather today?"
}

Technologies
Frontend: Next.js, Tailwind CSS
Backend: Django, Django REST Framework
AI Model: GPT-2 (via Hugging Face)
License
MIT License
