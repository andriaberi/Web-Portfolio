from django.http import JsonResponse
from .models import Experience, Project, Achievement
from django.shortcuts import get_object_or_404


def experience_list(request):
    experiences = Experience.objects.all()

    data = []
    for exp in experiences:
        data.append({
            "title": exp.title,
            "company": exp.company,
            "start_date": exp.start_date,
            "end_date": exp.end_date,
            "is_current": exp.is_current,
            "summary": exp.summary,
            "details": [
                line.strip()
                for line in exp.details.split("\n")
                if line.strip()
            ],
            "tech_stack": [
                tech.strip()
                for tech in exp.tech_stack.split(",")
                if tech.strip()
            ],
        })

    return JsonResponse(data, safe=False)

def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)

    data = {
        "title": project.title,
        "slug": project.slug,
        "short_description": project.short_description,
        "description": project.description,
        "category": project.category.name if project.category else None,

        "thumbnail": project.thumbnail.url if project.thumbnail else None,
        "video_demo": project.video_demo,

        "key_features": [
            line.strip()
            for line in project.key_features.split("\n")
            if line.strip()
        ],
        "architecture": [
            {"label": col1.strip(), "value": col2.strip()}
            for line in (project.architecture or "").split("\n")
            if "|" in line
            for col1, col2 in [line.split("|", 1)]
        ],
        "tech_stack": [
            tech.strip()
            for tech in project.tech_stack.split(",")
            if tech.strip()
        ],

        "problem_statement": project.problem_statement,
        "solution_overview": project.solution_overview,
        "challenges": project.challenges,
        "outcome": project.outcome,

        "role": project.role,
        "team_size": project.team_size,
        "project_type": project.project_type,

        "live_url": project.live_url,
        "github_url": project.github_url,

        "date_completed": project.date_completed,
        "created_at": project.created_at,
    }

    return JsonResponse(data)

def project_list(request):
    projects = Project.objects.all()

    data = []
    for project in projects:
        data.append({
            "title": project.title,
            "slug": project.slug,
            "short_description": project.short_description,
            "thumbnail": project.thumbnail.url if project.thumbnail else None,
            "category": project.category.name if project.category else None,
        })

    return JsonResponse(data, safe=False)

def achievement_list(request):
    achievements = Achievement.objects.all()

    data = []
    for a in achievements:
        data.append({
            "title": a.title,
            "issuer": a.issuer,
            "issue_date": a.issue_date,
            "description": a.description,
            "image": a.image.url if a.image else None,
        })

    return JsonResponse(data, safe=False)
