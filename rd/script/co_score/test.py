import sys
import json
import requests
import py2neo
from coScore import *

def is_compatible(graph, tool_name_1, tool_name_2):
    """Check if two tools have a isCompatible relationship in the database

    Args:
        graph (py2neo.Graph): The database
        tool_name_1 (str): The name of the 1st tool
        tool_name_2 (str): The name of the 2nd tool

    Returns:
        bool: True if the relationship isCompatible exists.
    """
    query = f"MATCH (a:Tool {{name: \"{tool_name_1}\"}}), (b:Tool {{name: \"{tool_name_2}\"}}) RETURN exists((a)-[:isCompatible]->(b))"
    res = graph.run(query).data()
    return list(res[0].values())[0]

def getAllToolsFromJson(file):
    print("\nGetting all tolls from json file")

    res = []

    f = open(file)
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

def create_json():


    co_scores = {}

    tools = getAllToolsFromJson("../../../data/data.json")
    g = py2neo.Graph("neo4j://localhost:7687", auth=("neo4j", "bio4tdummy"))

    print("\nCreating json file")
    count = len(tools)
    i=0
    for toolA in tools:
        percent = int(((i + 1) / count) * 100)


        j = 0
        for toolB in tools:

            sys.stdout.write(
                f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}% ({toolA}, {toolB})")
            sys.stdout.flush()


            if is_compatible(g, toolA, toolB):
                print("lala")
                co_scores[(toolA, toolB)] = coScore(toolA, toolB)

                f = open("test.json", "w")
                f.write(str(co_scores))
                f.close()

            j += 1
        i += 1



create_json()