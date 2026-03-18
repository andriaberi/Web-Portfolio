from django.urls import path
from .views import experience_list, project_list, achievement_list, codeforces_data

urlpatterns = [
    path("experience", experience_list, name="experience-list"),
    path("projects", project_list, name="projects-list"),
    path("achievements", achievement_list, name="achievement-list"),
    path('codeforces', codeforces_data, name="codeforces-data"),
]