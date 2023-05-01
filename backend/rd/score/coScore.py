from pathlib import Path

co_publications = {}

f = open((Path(__file__).parent / "data/co_publications.json").resolve(), "r")
co_publications = eval(f.read())
f.close()


def numberOfCoPublications(toolA, toolB):
    global co_publications

    if (toolA, toolB) in co_publications:
        return co_publications[(toolA, toolB)]
    elif (toolB, toolA) in co_publications:
        return co_publications[(toolB, toolA)]

    return 0



def coScore(toolA, toolB):

    def coPublicationScore(toolA, toolB):
        co_publications_score = 0

        number_of_co_publications = numberOfCoPublications(toolA, toolB)

        if number_of_co_publications >= 1:
            co_publications_score += 25
        if number_of_co_publications >= 2:
            co_publications_score += 25
        if number_of_co_publications >= 3:
            co_publications_score += 25
        if number_of_co_publications >= 4:
            co_publications_score += 25

        return co_publications_score

    co_publications_score = coPublicationScore(toolA, toolB)
    
    return co_publications_score





print(coScore('CHIPS', 'preg'))