from django.urls import path

from . import views

urlpatterns = [
    path('workflow_query', views.search_workflow_api, name="ask_api_for_workflow"),
    path('any_query/<str:query>', views.get_data, {'query': 'MATCH (n) RETURN n LIMIT 5'}, name="ask_api_for_data")
]
