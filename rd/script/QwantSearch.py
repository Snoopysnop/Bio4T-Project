import requests

def getLinks(tool1, tool2):
    """ @params two bio tools
        @return 10 top urls found with a qwant search
    """
    query = f"\"{tool1}\" \"{tool2}\""

    
    url = f"https://api.qwant.com/v3/search/web?q={query}&count={10}&locale=en_US&timeout=30"
    res = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})

    results = res.json()["data"]["result"]["items"]["mainline"][0]["items"]
    
    urls = []
    for result in results:
        u = result["url"]
        if(not("bing" in u)):
            urls.append(u)
            
    if(urls==[]):
        print("Timed out !")     
   
    return urls



#print(getLinks("CoverM", "BBMap"))