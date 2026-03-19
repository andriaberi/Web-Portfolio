import json
import urllib.request
from datetime import date
from math import ceil

from django.http import JsonResponse

from .models import Experience, Project, Achievement, Book


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

def project_list(request):
    projects = list(Project.objects.all())

    data = [
        {
            "index":             str(i).zfill(2),
            "title":             p.title,
            "slug":              p.slug,
            "short_description": p.short_description,
            "description":       p.description,
            "thumbnail":         p.thumbnail.url if p.thumbnail else None,
            "is_featured":       p.is_featured,
            "badge_label":       p.badge_label,
            "category":          p.category,                  # raw key: "ai_ml"
            "category_display":  p.get_category_display(),    # "AI / ML"
            "tag_label":         p.tag_label,
            "tech_stack": [
                t.strip()
                for t in p.tech_stack.split(",")
                if t.strip()
            ],
            "github_url":        p.github_url,
            "live_url":          p.live_url,
            "date_completed":    p.date_completed.strftime("%b %Y"),
        }
        for i, p in enumerate(projects, start=1)
    ]

    return JsonResponse(data, safe=False)


def achievement_list(request):
    data = [
        {
            "title":            a.title,
            "issuer":           a.issuer,
            "achievement_type": a.get_achievement_type_display(),  # "Competition"
            "year":             a.issue_date.strftime("%Y"),        # "2025"
            "month":            a.issue_date.strftime("%b"),        # "Nov"
            "description":      a.description,
        }
        for a in Achievement.objects.all()
    ]

    return JsonResponse(data, safe=False)

def reading_list(request):
    data = [
        {
            "title": b.title,
            "author": b.author,
            "status": b.status,
        }
        for b in Book.objects.all()
    ]

    return JsonResponse(data, safe=False)

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
