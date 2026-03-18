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

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, default="")
    short_description = models.CharField(max_length=255, default="")
    description = models.TextField(default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='projects'
    )

    thumbnail = models.ImageField(upload_to='projects/thumbnails/')
    video_demo = models.URLField(blank=True, null=True)

    key_features = models.TextField(blank=True)
    architecture = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=255)

    problem_statement = models.TextField(blank=True)
    solution_overview = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    outcome = models.TextField(blank=True)

    role = models.CharField(max_length=100, default="Programmer")
    team_size = models.PositiveIntegerField(default=1)
    project_type = models.CharField(
        max_length=50,
        choices=[
            ('personal', 'Personal'),
            ('freelance', 'Freelance'),
            ('startup', 'Startup'),
            ('open_source', 'Open Source'),
            ('company', 'Company / Employment'),
        ],
        default='personal',
    )

    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)

    date_completed = models.DateField()
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    issue_date = models.DateField()

    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="achievements/",
        blank=True,
        null=True,
        help_text="Optional badge/certificate image"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-issue_date", "-created_at"]

    def __str__(self):
        return f"{self.title} — {self.issuer}"

class PageVisit(models.Model):
    url = models.CharField(max_length=255, unique=True)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Page Visits'

    def __str__(self):
        return f"{self.url}: {self.count}"