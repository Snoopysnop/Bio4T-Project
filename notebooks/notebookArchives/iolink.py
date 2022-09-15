import requests
import json
import time

FILEPATH = "/media/halendral/DATA/Cours/M1/Projet/scripts/datatest.json"
FILEPATH2 = "/media/halendral/DATA/Cours/M1/Projet/data.json"


f = open(FILEPATH2,)
data = json.load(f)
cpt=0
inputSet = list()
outputSet = list()
inputterms = list()
outputterms = list()
inputuri = list()
outputuri = list()

if __name__ == "__main__":
    print(data['count'])
    for listElt in data['list']:
        fonctions = listElt['function']
        for uneFonction in fonctions:
            for unInput in uneFonction['input']:
                if (unInput['data']['term'] != []):
                    inputterms.append( json.dumps(unInput['data']['term']) )
                    inputuri.append( json.dumps(unInput['data']['uri']) )
            for unOutput in uneFonction['output']:
                if (unOutput['data']['term'] != []):
                    outputterms.append( json.dumps(unOutput['data']['term']) )
                    outputuri.append( json.dumps(unOutput['data']['uri']) )

            cpt += 1
    print("Nombre de fonction traitées: ", cpt)
    
    """
    for elt in inputterms:
        print(elt)
    """

    liaisonstermes = list( set.intersection(set(inputterms), set(outputterms)) )
    liaisonsuri = list( set.intersection(set(inputuri), set(outputuri)) )

    print("liaisons communes (termes): ", len(liaisonstermes), "/ ", len(inputterms), " & ", len(outputterms))
    print("liaisons communes (uri): ", len(liaisonsuri), "/ ", len(inputuri), " & ", len(outputuri))

    