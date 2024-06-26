from django.contrib import admin
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
   openapi.Info(
      title="It Party API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("chat/", include("event_chat.urls")),
    path("", include("mvt_admin.urls")),
    path('api/v1/', include('events.urls', namespace='events')),
    path('api/v1/', include('organaizer.urls', namespace='organaizer')),
    path('api/v1/', include('users.urls', namespace='users')),
    path('api/v1/', include('userevents.urls', namespace='userevents')),
    path('api/v1/', include('additions.urls', namespace='additions')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('django_channels_jwt.urls')),
    path('', include('social_django.urls', namespace='social')),
    path(
        'swagger<format>/', schema_view.without_ui(cache_timeout=0),
        name='schema-json'
        ),
    path(
        'swagger/', schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
        ),
    path(
        'redoc/',
        schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'
        ),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
        )
