import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)

def generate_recipe(ingredients: str) -> dict:
    response = client.responses.create(
        model="openai/gpt-oss-20b",
        input=f"""
Create a simple cooking recipe using these ingredients:
{ingredients}

Return the response EXACTLY in this format:

Title: <recipe title>

Ingredients:
...

Steps:
...

Cooking Time:
...
"""
    )

    text = response.output_text.strip()

    title = "Untitled Recipe"
    body = text

    if "Title:" in text:
        parts = text.split("Title:", 1)
        title_line = parts[1].split("\n", 1)[0].strip()
        title = title_line
        body = text.replace(f"Title: {title}", "").strip()

    return {
        "title": title,
        "instructions": body
    }