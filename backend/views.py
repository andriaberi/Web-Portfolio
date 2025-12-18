from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse
from .models import Experience


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