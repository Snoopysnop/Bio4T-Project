from pytrends.request import TrendReq
import json
import sys
import time


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


def getRelatedTools(tool, tools, to):
    res = {}

    kw_list = [tool]
    try:
        pytrends.build_payload(kw_list, timeframe='all')
    except:
        print()
        sys.stdout.write("\rtimeout")
        sys.stdout.flush()
        if not to:
            time.sleep(10)
            getRelatedTools(tool, tools, True)
        else:
            print("\nRetry after 12h")
            sys.exit()

    try:
        request = pytrends.related_queries()

        data = request[tool]["top"]

        if data is None:
            return res

        for i in range(len(data)):
            query = data.iloc[i]["query"]

            if query in tools:
                value = data.iloc[i]["value"]

                res[(tool, query)] = value

        return res

    except:
        sys.stdout.write("\033[1;31m")
        sys.stdout.write(f"\rERROR related_queries for {tool} returned :\n{pytrends.related_queries()}")
        sys.stdout.flush()
        sys.stdout.write("\033[0;0m")
        print()
        return {}


def buildDict():
    tools = getAllTools("../../../data/data.json")
    count = len(tools)

    d = {}

    print("\nbuilding dictionary")
    for i in range(count):
        tool = tools[i]
        res = getRelatedTools(tool, tools, False)

        d.update(res)

        f = open("save/save.json", "w")
        f.write(str(d))
        f.close()

        f = open("save/last_tool.txt", "w")
        f.write(tool)
        f.close()

        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}% {tool}")
        sys.stdout.flush()

    d = clean(d)

    f = open("related_tools.json", "w")
    f.write(str(d))


def buildDictFromSave():
    f = open("save/save.json", "r")
    d = eval(f.read())
    f.close()

    f = open("save/last_tool.txt", "r")
    start_tool = f.read()
    f.close()

    tools = getAllTools("../../../data/data.json")
    count = len(tools)

    start = tools.index(start_tool)

    print("\nbuilding dictionary")
    for i in range(start, count):
        tool = tools[i]
        res = getRelatedTools(tool, tools, False)

        d.update(res)

        f = open("save/save.json", "w")
        f.write(str(d))
        f.close()

        f = open("save/last_tool.txt", "w")
        f.write(tool)
        f.close()

        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}% {tool}")
        sys.stdout.flush()



def clean(d):
    res = {}
    print("\ncleaning dictionary")

    count = len(d.keys())
    i = 0
    for (tool1, tool2) in d.keys():
        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}%")
        sys.stdout.flush()

        if (tool2, tool1) in d:
            if interestOverTime(tool1) > interestOverTime(tool2):
                res[(tool1, tool2)] = d[(tool1, tool2)]
        else:
            res[(tool1, tool2)] = d[(tool1, tool2)]
        i += 1
    return res


def interestOverTime(tool):
    kw_list = [tool]
    res = 0

    try:
        pytrends.build_payload(kw_list, timeframe='all')
    except:
        print("\ntimeout")
        time.sleep(10)
        interestOverTime(tool)

    request = pytrends.interest_over_time()

    data = request

    for i in range(len(data)):
        res += data.iloc[i][tool]

    return res


pytrends = TrendReq(hl='en-US', tz=360)

buildDictFromSave()