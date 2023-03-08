from pathlib import Path

def relatedQueryScore(toolA, toolB):
    global related_tools

    if (toolA, toolB) in related_tools:
        return related_tools[(toolA, toolB)]
    return 0


def coPublicationScore(toolA, toolB):
    def numberOfCoPublications():
        global co_publications

        if (toolA, toolB) in co_publications:
            return co_publications[(toolA, toolB)]
        elif (toolB, toolA) in co_publications:
            return co_publications[(toolB, toolA)]

        return 0

    co_publications_score = 0

    number_of_co_publications = numberOfCoPublications()

    if number_of_co_publications >= 1:
        co_publications_score += 25
    if number_of_co_publications >= 2:
        co_publications_score += 25
    if number_of_co_publications >= 3:
        co_publications_score += 25
    if number_of_co_publications >= 4:
        co_publications_score += 25

    return co_publications_score


def coScore(toolA, toolB):
    co_publications_score = coPublicationScore(toolA, toolB)
    related_query_score = relatedQueryScore(toolA, toolB)

    co_score = (co_publications_score + related_query_score) / 2

    return co_score


co_publications = {}
related_tools = {}

f = open((Path(__file__) / "../co_publications.json").resolve(), "r")
related_tools = eval(f.read())
f.close()

f = open((Path(__file__) / "../related_tools.json").resolve(), "r")
co_publications = eval(f.read())
f.close()
