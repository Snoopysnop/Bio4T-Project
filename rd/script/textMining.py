from pickle import FALSE, TRUE
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

req = [Request('https://nf-co.re/eager'),Request('https://fr.wikipedia.org/wiki/Feu')]
wordOne = ["nf-core","feu"]
wordTwo = ["pipeline","domestication"]

# Function to find every index of start and end 
def findSentence(indexOcc, text:str):
    ponctuations =  [".","?",";","!"]
    find = False
    #sentences = []
    index = []
    for i in indexOcc:
        debut = 0
        fin = len(text)
        currentOcc=i

        # Trying to find the start of the sentence
        while not(find) and currentOcc>0 :
            if (currentOcc-2 >= 0 ):
                if text[currentOcc].isupper():
                    if (text[currentOcc-1] == ' ') :
                        if (text[currentOcc-2] in ponctuations) or (text[currentOcc-2] == ' '):
                            if( not(text[currentOcc-3].isupper()) ):
                                #
                                # Thiseas C. Lamnidis  ". L" is like the start of our sentence so, checking for "C. L"
                                #
                                find = True
                                debut=currentOcc
                        elif( (text[currentOcc-2]) == '\n'):
                            find = True
                            debut=currentOcc
                    elif( (text[currentOcc-1]) == '\n'):
                            find = True
                            debut=currentOcc
                elif( (text[currentOcc-1]) == '\n'):
                            find = True
                            debut=currentOcc
            currentOcc-=1
            
        find = False
        currentOcc=i
        
        # Trying to find the end of the sentence
        while not(find) and currentOcc<len(text):
            if (currentOcc+2 <= len(text) ):
                if (text[currentOcc+1] == " "):
                    if text[currentOcc] in ponctuations :
                        if( not(text[currentOcc-1].isupper()) ):
                            find = True
                            fin=currentOcc
                elif( (text[currentOcc+1]) == '\n'):
                    find = True
                    fin=currentOcc
            currentOcc+=1
        find = False

        if(debut != 0 and fin != len(text)):
            if( (debut,fin) not in index):
                #sentences.append(text[debut:fin+1])
                index.append((debut,fin+1))
    """for i in sentences:
        print(i)"""
    return index

# extract the sentences of url where both wordOne and wordTwo appear
def htmlToString(url:str,wordOne:str,wordTwo:str):
    res = []

    html_page = urlopen(url).read()
    soup = BeautifulSoup(html_page, 'html.parser')
    text = soup.getText('')

    # Writing our text in a file ( only visual )
    with open("test2.txt", "w", encoding="utf-8") as f:
        for ligne in text:
            f.write(str(ligne))

    ####### FIRST WORD OCC : INDEX  #######
    # Find every start indice of our 
    allOccNF =[m.start() for m in re.finditer(wordOne, text, flags = re.IGNORECASE)]
    indexFirstWord = findSentence(allOccNF, text)

    ####### SECOND WORD OCC : INDEX  #######
    allOccDocker = [m.start() for m in re.finditer(wordTwo, text, flags = re.IGNORECASE)]
    indexSecondWord = findSentence(allOccDocker,text)

    # the 2 words are in the same sentence
    for indexFirst in indexFirstWord :
        if indexFirst in indexSecondWord:
            res.append(text[indexFirst[0]:indexFirst[1]])
    return res

for i in htmlToString(req[0],wordOne[0],wordTwo[0]):
    print(i)

#for i in htmlToString(req[1],wordOne[1],wordTwo[1]):
#    print(i)

#TODO => faire les scores en fonction de l'appartenance au parti du texte
#           meme phrase  = coef 6
#           dans les memes 20% du text = coef 3
#           ect
