from pickle import FALSE, TRUE
from bs4 import BeautifulSoup
from googlesearch import search
from urllib.request import Request, urlopen
import requests
import re
import QwantSearch
from nltk.sentiment import SentimentIntensityAnalyzer

sia = SentimentIntensityAnalyzer()

# get the first "stop" url for a request with both tools 
# it use Google, but we will skip it to Qwant
def getURL(tool1, tool2, stop):
    query = f"\"{tool1}\" \"{tool2}\""
    return list(search(query, stop=stop))

# WIP - get the readme page in github of both tools
def getGithubReadme(tool1, tool2):
    query = f"\"{tool1}\" \"{tool2}\" \"github\" \"repository\""
    url = list(search(query, stop=1))[0]

    res = requests.get(url + "/blob/main/README.md")
    return res.text

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
    #for i in index:
    #    print(i)
    return index

# extract the sentences of url where both wordOne and wordTwo appear
def htmlToString(url:str,wordOne:str,wordTwo:str):
    res = {}

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
    for indexFirst in indexFirstWord:
        if indexFirst in indexSecondWord:
            if text[indexFirst[0]:indexFirst[1]] not in res.keys():
                key = (text[indexFirst[0]:indexFirst[1]])
                res[key] = 1
            else:
                key = (text[indexFirst[0]:indexFirst[1]])
                res[key] = res.get(key)+1 
                
    return (res,indexFirstWord,indexSecondWord)


#Scoring by using sentences were the both tools appear   (actually coef 6, can be change)
def shittyScoring(dictionnaire):
    res = sia.polarity_scores("")
    #print(res)



    actualScore = 0
    for i in dictionnaire[0]:
        res = sia.polarity_scores(i)
        print(res)
        actualScore += dictionnaire[0][i]*(pow(2,6)) # ou 64
    actualScore += len(dictionnaire[1])*(4) + len(dictionnaire[2])*(4)
    return actualScore

# little part to show the result
def showMe(url:str,wordOne:str,wordTwo:str):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    dictioAndIndex = htmlToString(req,wordOne,wordTwo)
    #for i in (dictioAndIndex[0]):
    #    print("[ \"" ,i , "\" ]", " apparait : " , dictioAndIndex[0][i], " fois")
    print("score de ",wordOne, " et ",wordTwo, " = ", shittyScoring(dictioAndIndex), " sur ", url)


def showAll(urls, wordOne,wordTwo):
    for url in urls:
        showMe(url,wordOne,wordTwo)


##
#The starter function with only 2 tools in parameters
def twoToolsToAnalyse(tool1, tool2):
    urls = QwantSearch.getLinks(tool1, tool2)
    showAll(urls,tool1,tool2)





#### TEST PART ####
'''
# basic data to test
target = ['https://nf-co.re/eager','https://fr.wikipedia.org/wiki/Feu']
wordOne = ["nf-core","feu","BBMap"]
wordTwo = ["docker","domestication","CoverM","Trimmomatic"]
#reqList = getURL("Trimmomatic", "BBMap", 5) 
qwantList = QwantSearch.getLinks("Trimmomatic", "BBMap") #Attention on tombe sur des liens pubs
#getGithubReadme("Trimmomatic", "BBMap")

#showAll(qwantList,wordOne[2],wordTwo[3])
#showMe(target[0],wordOne[0],wordTwo[0])
#showMe(target[1],wordOne[1],wordTwo[1])
'''

