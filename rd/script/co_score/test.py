import sys
import json
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


def toolDetailB(toolID):
    url = "https://bio.tools/api/t?id=xconnector"
    request = requests.get(
        url,
        headers={
            "Accept": "application/json",
        }
    )

    return request.json()


def getAllTools(file):
    print("building tool list")
    res = []

    f = open(file, "r")
    data = json.load(f)
    count = len(data["list"])

    for i in range(count):
        tool = data["list"][i]["name"]
        res.append(tool)
        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}%")
        sys.stdout.flush()
    return res



"""
f = open("co_publications.json", "r")
data = eval(f.read())
f.close()

print(type(data))
"""

"""
f = open("../../../data/data.json", "r")
data = json.load(f)
l = [
        {"tool1":"2600","tool2":"2622","score":65},
        {"tool1":"2681","tool2":"2684","score":65},
        {"tool1":"2681","tool2":"2697","score":65}
    ]

for tool in data["list"]:
    if(tool["name"] == "PRISM"):
        print(tool["biotoolsID"])
"""

print(toolDetail("PRISM"))