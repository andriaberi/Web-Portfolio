from django.contrib import admin
from django.urls import path, include, re_path
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),  # API endpoints
    re_path(r'^.*$', index),            # Catch-all for React routes
]

