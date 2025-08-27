from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests 
import os

with open('/home/ubuntu/backend_var.txt') as f:
    backend = f.readline().strip()


def home(request):
    return render(request, 'xo_app/home.html')

def startGame(request):
    if request.method == 'POST':
        username = request.POST.get("name")
        response = requests.post(url=f'http://{backend}:8080/start', data={'username': username, 'game': 'start'})
        response_json = response.json()
        if response_json['status'] == 'not_valid_username':
            return render(request, 'xo_app/home.html', context={'not_valid_username': True, 'start': True})

        return render(request, 'xo_app/playGame.html', context={"user": username, 'symbol': response_json['symbol'], 'start': True})
    return render(request, 'xo_app/playGame.html')

def make_move(request):
    if request.method == 'POST':
        username= request.POST.get("username")
        move = request.POST.get("move")
        finish = request.POST.get("finish")
        response = requests.post(url=f'http://{backend}:8080/make_move', data={'username': username, 'move': move, 'finish': finish})
    return HttpResponse(200)

def check_move(request):
    if request.method == 'GET':
        username = request.GET.get("username")
        response = requests.get(url=f'http://{backend}:8080/check_move/?username={username}')
        response_json = response.json()
        return JsonResponse(response_json)
        
    return HttpResponse(200)
