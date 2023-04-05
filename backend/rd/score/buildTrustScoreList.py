import sys, json

from trustScore import *


"""
Use with the data.json
Returns the list of tools
"""
def getAllToolsFromJson(file):
    print("\nGetting all tools from json file")

    res = []

    f = open(file)
    data = json.load(f)
    count = len(data["list"])


    for i in range(count):
        name = data["list"][i]["name"]
        biotoolsID = data["list"][i]["biotoolsID"]

        res.append(
            {"name": name, "biotoolsID": biotoolsID}
        )

        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}%")
        sys.stdout.flush()

    return res


def buildTrustScoreList(tools):
    print("\nGetting all trust scores")

    res = []

    count = len(tools)

    for i in range(count):
        tool = tools[i]

        name = tool["name"]
        biotoolsID = tool["biotoolsID"]

        try:
            res.append(
                {"name": name, "id": biotoolsID, "trust_score": trustScore(name)}
            )

        except:

            sys.stdout.write("\033[1;31m")
            sys.stdout.write(f"\nERROR with {tool}")
            sys.stdout.flush()
            sys.stdout.write("\033[0;0m")
            print()

            res.append(
                {"name": name, "id": biotoolsID, "trust_score": 0}
            )
            

        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}% {name}" + 15*' ')
        sys.stdout.flush()


    return res





trustScoreList = buildTrustScoreList(getAllToolsFromJson("backend/data/data.json"))

f = open("backend/rd/score/trust_scores.txt", "w")
f.write(str(trustScoreList))