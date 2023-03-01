import sys
import json



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






print(getAllTools("../../../data/data.json"))