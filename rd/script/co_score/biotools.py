import requests

def toolDetail(tool):
    url = "http://bio.tools/api/t/"
    request = requests.get(
        url + tool,
        headers={
            "Accept": "application/json",
        }
    )

    return request.json()