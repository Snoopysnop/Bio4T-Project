import sys, json
from biotools import *

"""
Use with the data.json
Returns the list of tools
"""
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


"""
Return publication registered in bio.tools for the tool
"""
def getPublications(tool):
    publications = []

    for publication in toolDetail(tool)["publication"]:
        publications.append({
            "doi": publication["doi"],
            "pmid": publication["pmid"],
            "pmcid": publication["pmcid"]
        })

    return publications


"""
Return all publications registered in bio.tools for all tools in the list in parameter
"""
def getAllPublication(tools):
    print("\nGetting all publications")

    all_publications = {}

    count = len(tools)

    for i in range(count):

        tool = tools[i]

        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}% {tool}")
        sys.stdout.flush()

        try:
            publications = getPublications(tool)
            all_publications[tool] = publications

        except:
            sys.stdout.write("\033[1;31m")
            sys.stdout.write(f"\rERROR publications for {tool} returned :\n{publications}")
            sys.stdout.flush()
            sys.stdout.write("\033[0;0m")
            print()

    return all_publications



"""
Return common publication between publications1 and publications2
"""
def getCoPublications(publications1, publications2):
    co_publications = []

    for publication1 in publications1:
        for publication2 in publications2:
            if (publication1["doi"] is not None and publication1["doi"] == publication2["doi"]) or \
                    (publication1["pmid"] is not None and publication1["pmid"] == publication2["pmid"]) or \
                    (publication1["pmcid"] is not None and publication1["pmcid"] == publication2["pmcid"]):
                co_publications.append(publication1)

    return co_publications


"""
Returns the number of co_publication for each pair of tools in the dictionnary in parameter
The parameter should be get with getAllPublication()
"""
def buildCoPublicationDict(all_publications):
    print("\nGetting all publications in common")

    all_co_publications = {}
    count = len(all_publications.keys())

    i = 0
    for tool1 in all_publications.keys():
        percent = int(((i + 1) / count) * 100)
        sys.stdout.write(
            f"\r|{percent * '▉'}{(100 - percent) * '.'}| {percent}%")
        sys.stdout.flush()

        j = 0
        for tool2 in all_publications.keys():

            if i < j:
                publications_in_common = getCoPublications(all_publications[tool1], all_publications[tool2])
                if len(publications_in_common) > 0:
                    all_co_publications[(tool1, tool2)] = len(publications_in_common)
            j += 1
        i += 1

    return all_co_publications



_all_publications_in_common = buildCoPublicationDict(getAllPublication(getAllToolsFromJson("/../../data/data.json")))
_f = open("co_publications.json", "w")
_f.write(str(_all_publications_in_common))
