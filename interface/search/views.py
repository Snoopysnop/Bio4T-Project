from django.shortcuts import render

from .forms import *


def search(request):
    workflowForm = WorkflowForm()
    queryForm = QueryForm()
    return render(request, 'search/search.html', {'workflowForm': workflowForm, 'queryForm': queryForm})


def search_and_display_workflow(request):
    if request.method == 'POST':
        form = WorkflowForm(request.POST)
        if form.is_valid():
            context = {
                'input': form.cleaned_data['input'],
                'output': form.cleaned_data['output'],
                'limit': form.cleaned_data['limit'],
                'depth': form.cleaned_data['depth'],
                'query_type': 'workflow_query',
            }
            return render(request, 'search/results.html', context)
    return search(request)


def search_and_display_any_query(request):
    if request.method == 'POST':
        form = WorkflowForm(request.POST)
        if form.is_valid():
            context = {
                'query': form.cleaned_data['query'],
                'query_type': 'workflow_query',
            }
            return render(request, 'search/results.html', context)
    return search(request)
