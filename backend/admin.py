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
    list_display = ('title', 'category', 'is_featured', 'order')
    list_editable = ('order', 'is_featured')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'description', 'technologies')

admin.site.register(models.Category)