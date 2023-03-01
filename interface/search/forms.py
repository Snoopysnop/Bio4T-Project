from django import forms


class WorkflowForm(forms.Form):
    input = forms.CharField(label="input")
    output = forms.CharField(label="output")
    limit = forms.IntegerField(label="limit", initial=20)
    depth = forms.IntegerField(label="depth", initial=5)


class QueryForm(forms.Form):
    query = forms.CharField(label="Query")
