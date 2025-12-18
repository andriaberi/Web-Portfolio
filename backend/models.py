from django.db import models
from django.utils.text import slugify

class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    summary = models.TextField(help_text="Short overview shown on the card")

    details = models.TextField(help_text="Detailed achievements (one per line)")

    tech_stack = models.CharField(max_length=255, help_text="Comma-separated list of technologies")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [
            "-is_current",   # current job first
            "-start_date",   # newest → oldest
        ]

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
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='projects/thumbnails/')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='projects')

    # Technical details
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated list of technologies")
    date_completed = models.DateField()
    is_featured = models.BooleanField(default=False)

    # URLS
    live_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)

    order = models.PositiveIntegerField(default=0, help_text="Used to manually order projects")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def get_tech_list(self):
        return [tech.strip() for tech in self.tech_stack.split(',')]