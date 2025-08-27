from django.urls import path
from xo_back_app import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path("start", views.start, name="start"),
    path("make_move", views.make_move, name="make_move"),
    path("check_move/", views.check_move, name="check_move"),
]
urlpatterns += staticfiles_urlpatterns()