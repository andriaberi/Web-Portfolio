from django.db import models

class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)

    summary = models.TextField(
        help_text="Short overview shown on the card"
    )

    details = models.TextField(
        help_text="Detailed achievements (one per line)"
    )

    tech_stack = models.CharField(
        max_length=255,
        help_text="Comma-separated list of technologies"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [
            "-is_current",   # current job first
            "-start_date",   # newest → oldest
        ]

    def __str__(self):
        return f"{self.title} @ {self.company}"