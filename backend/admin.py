from django.contrib import admin
from . import models

admin.site.site_header = "Admin Page"
admin.site.site_title = "Administration"
admin.site.index_title = "Content management"

@admin.register(models.Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display  = ("title", "company", "location", "job_type", "start_date", "end_date", "is_current")
    list_filter   = ("job_type", "is_current")
    search_fields = ("title", "company", "location", "summary", "details")
    ordering      = ("-is_current", "-start_date")

    fieldsets = (
        (None, {
            "fields": ("title", "company", "location", "job_type")
        }),
        ("Dates", {
            "fields": ("start_date", "end_date", "is_current")
        }),
        ("Content", {
            "fields": ("summary", "details", "tech_stack")
        }),
        ("Impact", {
            "fields": ("metrics",),
            "description": 'JSON list of {\"value\": \"~20%\", \"label\": \"sprint productivity gain\"} objects.',
        }),
    )


@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display    = ("title", "category", "is_featured", "order", "date_completed", "created_at")
    list_filter     = ("category", "is_featured", "date_completed")
    list_editable   = ("order", "is_featured")
    search_fields   = ("title", "short_description", "description", "tech_stack")
    prepopulated_fields = {"slug": ("title",)}
    ordering        = ("order", "-date_completed")
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug", "short_description", "description")
        }),
        ("Categorisation", {
            "fields": ("category", "tag_label")
        }),
        ("Presentation", {
            "fields": ("thumbnail", "is_featured", "badge_label", "order")
        }),
        ("Stack & Links", {
            "fields": ("tech_stack", "github_url", "live_url")
        }),
        ("Meta", {
            "fields": ("date_completed", "created_at")
        }),
    )

@admin.register(models.Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "issuer",
        "issue_date",
        "created_at",
    )

    list_filter = (
        "issuer",
        "issue_date",
    )

    search_fields = (
        "title",
        "issuer",
        "description",
    )

    ordering = ("-issue_date", "-created_at")
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "issuer", "issue_date")
        }),
        ("Content", {
            "fields": ("description",)
        }),
        ("Media", {
            "fields": ("image",)
        }),
        ("Meta", {
            "fields": ("created_at",)
        }),
    )