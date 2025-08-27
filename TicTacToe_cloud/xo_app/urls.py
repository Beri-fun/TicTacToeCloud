from django.urls import path
from xo_app import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("", views.home, name="home"),
    path("startGame", views.startGame, name="startGame"),
    path("make_move", views.make_move, name="make_move"),
    path("check_move", views.check_move, name="check_move"),
]
urlpatterns += staticfiles_urlpatterns()