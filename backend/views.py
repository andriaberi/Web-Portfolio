import json
import urllib.request
from datetime import date
from math import ceil

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from .models import Experience, Project, Achievement, PageVisit


def _duration_label(start: date, end: date | None) -> str:
    """Returns a human-readable duration string, e.g. '6 months' or '1 yr 3 mos'."""
    end = end or date.today()
    total_months = (end.year - start.year) * 12 + (end.month - start.month)
    total_months = max(total_months, 1)
    years, months = divmod(total_months, 12)
    if years and months:
        return f"{years} yr {months} mo{'s' if months > 1 else ''}"
    if years:
        return f"{years} yr{'s' if years > 1 else ''}"
    return f"{total_months} month{'s' if total_months > 1 else ''}"


def _duration_pct(start: date, end: date | None, max_months: int) -> int:
    """Returns bar fill width as a 0-100 integer percentage."""
    end = end or date.today()
    total_months = max((end.year - start.year) * 12 + (end.month - start.month), 1)
    return min(ceil(total_months / max_months * 100), 100)


def experience_list(request):
    experiences = list(Experience.objects.all())

    # Longest tenure drives the 100 % bar width so bars are relative to each other
    def month_span(exp):
        end = exp.end_date or date.today()
        return max((end.year - exp.start_date.year) * 12 + (end.month - exp.start_date.month), 1)

    max_months = max((month_span(e) for e in experiences), default=1)

    data = []
    for i, exp in enumerate(experiences, start=1):
        data.append({
            "index": str(i).zfill(2),
            "title": exp.title,
            "company": exp.company,
            "location": exp.location,
            "job_type": exp.get_job_type_display(),  # "Co-op", "Full-time", …
            "start_date": exp.start_date.strftime("%b %Y"),
            "end_date": exp.end_date.strftime("%b %Y") if exp.end_date else "Present",
            "is_current": exp.is_current,
            "duration_label": _duration_label(exp.start_date, exp.end_date),
            "duration_pct": _duration_pct(exp.start_date, exp.end_date, max_months),
            "summary": exp.summary,
            "details": [
                line.strip()
                for line in exp.details.splitlines()
                if line.strip()
            ],
            "tech_stack": [
                tech.strip()
                for tech in exp.tech_stack.split(",")
                if tech.strip()
            ],
            "metrics": exp.metrics,  # already a list of {value, label} dicts
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


@csrf_exempt
def track_visit(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        url = data.get('url')
        if not url:
            return JsonResponse({'error': 'Missing URL'}, status=400)

        # Get or create record for this URL
        page, created = PageVisit.objects.get_or_create(url=url)
        page.count += 1
        page.save()

        return JsonResponse({'count': page.count})

    return JsonResponse({'error': 'Invalid method'}, status=405)


def codeforces_data(request):
    username = 'andriaberi'

    try:
        urls = {
            'info': f'https://codeforces.com/api/user.info?handles={username}',
            'rating': f'https://codeforces.com/api/user.rating?handle={username}',
            'status': f'https://codeforces.com/api/user.status?handle={username}',
        }

        results = {}
        for key, url in urls.items():
            with urllib.request.urlopen(url, timeout=10) as response:
                results[key] = json.loads(response.read())

        data = {
            'info': results['info']['result'][0],
            'ratingHistory': results['rating']['result'],
            'submissions': results['status']['result'],
        }

        return JsonResponse(data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
