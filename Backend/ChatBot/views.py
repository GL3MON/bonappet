from django.shortcuts import render, HttpResponse
from django.http.response import HttpResponseNotFound, JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from .chatbot import BonBot
import time
import json

llm = ChatGoogleGenerativeAI(
    api_key="AIzaSyBmW8aWpZdngH83dR2-jZCN9pnZLRT0HiY",
    model="gemini-1.5-pro",
    temperature=0.7,
    max_output_tokens=1200,
)


bon_bot = BonBot()
bon_bot_chain =  bon_bot.get_llm_chain()

def bon_bot_stream_response(user_query: str):
    for chunk in bon_bot_chain.stream(user_query):
        print(chunk)
        yield chunk

@csrf_exempt
def chat(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            user_query = data.get("query", "")
            print(user_query)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        if user_query:
            try:
                bot_response = "Horray... Dev on work"
                return StreamingHttpResponse(bon_bot_stream_response(user_query=user_query))
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=500)
        else:
            return JsonResponse({"error": "No query provided."}, status=400)

    return HttpResponseNotFound("Invalid request method. Please use POST.")