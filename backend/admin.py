from django.contrib import admin
from . import models

class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "company",
        "start_date",
        "end_date",
        "is_current",
    )

    list_filter = ("company", "is_current")
    search_fields = ("title", "company", "summary", "details")
    ordering = ("-is_current", "-start_date")

    fieldsets = (
        (None, {
            "fields": ("title", "company")
        }),
        ("Dates", {
            "fields": ("start_date", "end_date", "is_current")
        }),
        ("Content", {
            "fields": ("summary", "details", "tech_stack")
        }),
    )

admin.site.register(models.Experience, ExperienceAdmin)

@admin.register(models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'project_type',
        'role',
        'order',
        'date_completed',
        'created_at',
    )

    list_filter = (
        'project_type',
        'category',
        'date_completed',
    )

    search_fields = (
        'title',
        'short_description',
        'description',
        'tech_stack',
    )

    prepopulated_fields = {
        'slug': ('title',)
    }

    ordering = ('order', '-created_at')
    list_editable = ('order', )

    readonly_fields = ('created_at',)

    fieldsets = (
        ('Basic Info', {
            'fields': (
                'title',
                'slug',
                'short_description',
                'description',
                'category',
            )
        }),
        ('Media', {
            'fields': (
                'thumbnail',
                'video_demo',
            )
        }),
        ('Technical Details', {
            'fields': (
                'key_features',
                'architecture',
                'tech_stack',
            )
        }),
        ('Case Study', {
            'classes': ('collapse',),
            'fields': (
                'problem_statement',
                'solution_overview',
                'challenges',
                'outcome',
            )
        }),
        ('Role & Context', {
            'fields': (
                'role',
                'team_size',
                'project_type',
            )
        }),
        ('Links', {
            'fields': (
                'live_url',
                'github_url',
            )
        }),
        ('Meta & Display', {
            'fields': (
                'order',
                'date_completed',
                'created_at',
            )
        }),
    )


admin.site.register(models.Category)