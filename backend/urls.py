from django.urls import path
from .views import experience_list, project_list, project_detail, achievement_list, track_visit

urlpatterns = [
    path("experience", experience_list, name="experience-list"),
    path("projects", project_list, name="projects-list"),
    path("projects/<str:slug>", project_detail, name="project-detail"),
    path("achievements", achievement_list, name="achievement-list"),
    path('visitors', track_visit, name='track_visit'),
]