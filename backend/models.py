from django.db import models
from django.utils.text import slugify

class Experience(models.Model):
    JOB_TYPE_CHOICES = [
        ("full_time", "Full-time"),
        ("part_time", "Part-time"),
        ("coop",      "Co-op"),
        ("internship","Internship"),
        ("contract",  "Contract"),
        ("freelance", "Freelance"),
    ]

    title      = models.CharField(max_length=100)
    company    = models.CharField(max_length=100)
    location   = models.CharField(max_length=100, blank=True)          # "Horsham, PA"
    job_type   = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default="full_time")

    start_date = models.DateField()
    end_date   = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    summary    = models.TextField(help_text="Short overview shown on the card")
    details    = models.TextField(help_text="Achievements — one per line")
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated technologies")

    metrics    = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_current", "-start_date"]

    def __str__(self):
        return f"{self.title} @ {self.company}"

class Project(models.Model):
    CATEGORY_CHOICES = [
        ("systems",  "Systems"),
        ("ai_ml",    "AI / ML"),
        ("web",      "Web"),
        ("mobile",   "Mobile"),
        ("devtools", "Dev Tools"),
        ("other",    "Other"),
    ]

    title             = models.CharField(max_length=200)
    slug              = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description       = models.TextField()

    category    = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="other")
    # Human-readable tag shown on the card, e.g. "Systems / ML"
    tag_label   = models.CharField(max_length=80, blank=True)

    thumbnail   = models.ImageField(upload_to="projects/thumbnails/")
    is_featured = models.BooleanField(default=False)
    badge_label = models.CharField(max_length=60, blank=True)
    order       = models.PositiveIntegerField(default=0)

    tech_stack  = models.CharField(max_length=255, help_text="Comma-separated")
    github_url  = models.URLField(blank=True, null=True)
    live_url    = models.URLField(blank=True, null=True)

    date_completed = models.DateField()
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-date_completed"]

    def __str__(self):
        return self.title

class Achievement(models.Model):
    TYPE_CHOICES = [
        ("competition",   "Competition"),
        ("certification", "Certification"),
        ("award",         "Award"),
        ("scholarship",   "Scholarship"),
        ("honor",         "Honor"),
        ("other",         "Other"),
    ]

    title        = models.CharField(max_length=200)
    issuer       = models.CharField(max_length=200)
    issue_date   = models.DateField()
    achievement_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default="other")
    description  = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-issue_date", "-created_at"]

    def __str__(self):
        return f"{self.title} — {self.issuer}"