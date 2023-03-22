from datetime import datetime
from biotools import *
 
def getCitationCount(tool_detail):

    citation_count = 0

    for publication in tool_detail["publication"]:
        citation_count  += publication["metadata"]["citationCount"]
    return citation_count


def isValidated(tool_detail):

    return bool(tool_detail["validated"])


def getLastUpdateDateAge(tool_detail):

    def getLastUpdateDate(tool_detail):
        last_update = tool_detail["lastUpdate"]
        date_str =  '-'.join(last_update.split('-')[0:2]) + "-" + last_update.split('-')[2][0:2]
        return datetime.strptime(date_str, '%Y-%m-%d')

    return (datetime.today() - getLastUpdateDate(tool_detail)).days


def trustScore(tool):

    def validatedScore(tool_detail):
        if(isValidated(tool_detail)):
            return 100

        return 0

    def lastUpdateAgeScore(toolDetail):
        last_update_age = getLastUpdateDateAge(tool_detail)

        if(last_update_age < 100):
            return 100

        elif(last_update_age < 365):
            return 70

        elif(last_update_age < 1000):
            return 30

        elif(last_update_age < 1000):
            return 30

        return 0

    def citationCountScore(toolDetail):

        citation_count = getCitationCount(tool_detail)

        if(citation_count > 10000):
            return 100

        elif(citation_count > 5000):
            return 80

        elif(citation_count > 1000):
            return 70 

        elif(citation_count > 500):
            return 40 

        elif(citation_count > 100):
            return 30 

        elif(citation_count > 50):
            return 25 

        elif(citation_count > 20):
            return 20 

        elif(citation_count > 10):
            return 10 

        elif(citation_count > 0):
            return 5

        return 0

        


    tool_detail = toolDetail(tool)

    validated_score = validatedScore(tool_detail)
    last_update_age_score = lastUpdateAgeScore(tool_detail)
    citation_count_score = citationCountScore(tool_detail)



    return 0.1*validated_score+0.5*last_update_age_score+0.4*citation_count_score

    


print(trustScore("blast"))




