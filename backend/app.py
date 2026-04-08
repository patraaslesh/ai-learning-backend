from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# 🔑 Load API key
load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")

print("API KEY:", API_KEY)  # debug (remove later)

# 🔥 AI Function
def ask_ai(prompt):
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost",
                "X-Title": "AI Learning Assistant"
            },
            json={
                "model": "openai/gpt-3.5-turbo",  # ✅ FIXED MODEL
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        data = response.json()

        if "choices" not in data:
            return f"API Error: {data}"

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        return f"Error: {str(e)}"


# 📘 Study Planner
@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    try:
        data = request.json
        goal = data.get("goal")

        prompt = f"""
        Create a structured 7-day beginner-friendly learning plan for: {goal}.
        """

        result = ask_ai(prompt)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})


# 💬 Chat API
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_input = data.get("message")

        prompt = f"""
        Explain this step-by-step in simple terms.
        Use examples.
        Question: {user_input}
        """

        result = ask_ai(prompt)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)