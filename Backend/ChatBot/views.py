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
import json

API_KEY = "AIzaSyCPz0WdsXp9dhYg_rWNZnGDINv11rqxi-I"

bon_bot = BonBot(api_key=API_KEY)
bon_bot_chain =  bon_bot.get_llm_chain()
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=API_KEY)

def bon_bot_stream_response(query: str, context: str):
    for chunk in bon_bot_chain.stream({"query":query, "context":context}):
        print(chunk)
    yield chunk

# @csrf_exempt
def chat(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            query = data.get("query", "")
            print(query)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        if query:
            try:
                embedding = embeddings.embed_query(query)
                food = Food.objects.order_by(CosineDistance('embedding', embedding))[0]
                context = f"Food Name: {food.name}, Food Description: {food.description}, Restaurent: {food.restaurant.name}"
                return StreamingHttpResponse(bon_bot_stream_response(query=query, context=context))
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
                restaurant=restaurant,
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