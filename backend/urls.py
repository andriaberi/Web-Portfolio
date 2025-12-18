from django.urls import path
from .views import experience_list

urlpatterns = [
    path("experience", experience_list, name="experience-list"),
]