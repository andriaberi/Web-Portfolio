from django.contrib import admin
from django.urls import path, include, re_path
from .views import index
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),  # API endpoints
]

# Serve media & static in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# React catch-all MUST be last
urlpatterns += [
    re_path(r'^(?!media/|static/).*$',
            index,
            name='react-app'),
]