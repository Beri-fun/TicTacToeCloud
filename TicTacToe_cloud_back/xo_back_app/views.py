from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from xo_back_app.models import Games
from django.db.models import Q
from django.middleware.csrf import  get_token
from copy import deepcopy


@csrf_exempt
def start(request):

    if request.method == 'POST':

        new_user = request.POST.get('username')
        is_user = Games.objects.filter(Q(user1=new_user) | Q(user2=new_user))
        if len(is_user) > 0:
            return JsonResponse(data={'status': 'not_valid_username'})

        result = Games.objects.filter(user2=None)
        if len(result) == 0:
            Games.objects.create(user1=new_user)
            return JsonResponse(data={'status': 'waiting', 'symbol': 'O'})
        else:
            game = Games.objects.get(user2=None)
            game.user2 = new_user
            game.move = game.user1
            game.whatMove = 'None'
            game.save()
            return JsonResponse(data={'status': 'waitingForMove', 'symbol': 'X'})
        
    return HttpResponse(200)

@csrf_exempt
def make_move(request):            
    if request.method == 'POST':
        username = request.POST.get('username')
        move = request.POST.get('move')
        finish = request.POST.get('finish')
        game = list(Games.objects.filter(Q(user1=username) | Q(user2=username)))[0]
        if finish == '1':
            game.finish = '1'
        game.whatMove = move
        game.save()
    return HttpResponse(200)

@csrf_exempt
def check_move(request, username=None):
    possible_moves = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
    username = request.GET.get("username", None)
    game = list(Games.objects.filter(Q(user1=username) | Q(user2=username)))[0]
    if game.move != username:
        if game.whatMove not in possible_moves:
            return JsonResponse({'move': None})
        else:
            move = deepcopy(game.whatMove)
            game.whatMove = None
            game.move = username
            game.save()
            if game.whatMove not in possible_moves and game.finish == '1':
                game.delete()
            return JsonResponse({'move': move})
    else:
        return JsonResponse({'move': 'your_move'})

