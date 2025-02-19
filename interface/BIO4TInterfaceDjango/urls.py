from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_rest/', include('api.urls')),
    path('search/', include('search.urls')),
]

urlpatterns += staticfiles_urlpatterns()

