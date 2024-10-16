from django.shortcuts import render, HttpResponse
from django.http.response import HttpResponseNotFound, JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from .chatbot import BonBot
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from .models import Food, Restaurant
from pgvector.django import CosineDistance
import time
import json

# llm = ChatGoogleGenerativeAI(
#     api_key="AIzaSyBmW8aWpZdngH83dR2-jZCN9pnZLRT0HiY",
#     model="gemini-1.5-pro",
#     temperature=0.7,
#     max_output_tokens=1200,
# )


# bon_bot = BonBot()
# bon_bot_chain =  bon_bot.get_llm_chain()
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key="AIzaSyCPz0WdsXp9dhYg_rWNZnGDINv11rqxi-I")

def bon_bot_stream_response(user_query: str):
    test = "dsdasdasdasasdasdasasasdas"
    for chunk in test:
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

@csrf_exempt
def insert_food(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            name = data.get("name", "")
            restaurant_id = data.get("restaurant_id", "")
            description = data.get("description", "")
            embedding = embeddings.embed_query(description)
        except json.JSONDecodeError:
            return JsonResponse({"response": "Invalid JSON format"}, status=400)
        
        try:
            restaurant = Restaurant.objects.get(restaurant_id=restaurant_id)
            Food.objects.create(
                name=name,
                restaurant_id=restaurant,
                description=description,
                embedding=embedding
            )
            return JsonResponse({"response": "Successfully Inserted"}, status=200)
        except ValueError:
            return JsonResponse({"reponse": "Failed to Insert"}, status=400)
            
    return HttpResponseNotFound("Invalid request method. Please use POST.")

@csrf_exempt
def test_vector(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            search_query = data.get("query", "")
        except json.JSONDecodeError:
                return JsonResponse({"response": "Invalid JSON format"}, status=400)
        
        try:
            embedding = embeddings.embed_query(search_query)
            print(type(embedding))
            food = Food.objects.order_by(CosineDistance('embedding', embedding))[0]
            return JsonResponse({"response": f"{food.name} - {food.description}"})
        
        except ValueError:
            return JsonResponse({"response": "Failed to retrieve the data"})
        
    return HttpResponseNotFound("Invalid request method. Please use POST.")