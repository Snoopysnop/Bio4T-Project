from django.urls import path

from . import views

urlpatterns = [
    path('', views.search, name='search'),
    path('workflow_query', views.search_and_display_workflow, name='search_workflow'),
    path('any_query', views.search_and_display_any_query, name='any_query'),
]
