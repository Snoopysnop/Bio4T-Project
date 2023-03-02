import os
import tldextract
import pickle
from bs4 import BeautifulSoup
from googlesearch import search
from urllib.request import Request, urlopen

def getURLs(tool_name, stop):
    query = f"\"{tool_name}\""
    return list(search(query, stop=stop))

def save_html(html, tool_name, website):
    with open(f"./data/website_scraped/{tool_name}_{tldextract.extract(website).domain}.html", "w", encoding="utf-8") as fout:
        fout.write(html)

def save_soup(soup, outfile):
    with open(f"{outfile}.txt", "wb") as f:
        pickle.dump(soup, f)

def read_soup(filename) -> BeautifulSoup:
    with open(f"{filename}.txt", "rb") as f:
        return pickle.load(f)

def get_htmls(tool_name, stop: int = 10):
    data = getURLs(tool_name, stop)
    for link in data:
        if not(os.path.isfile(f"./data/website_scraped/{tool_name}_{tldextract.extract(link).domain}.txt")):
            req = Request(
                url=link, 
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            html_page = urlopen(req).read()
            soup = BeautifulSoup(html_page, 'html.parser')
            print(link)
            text = soup.getText()
            
            save_html(text, tool_name, link)

def clear_navbars(soup):
    while (soup.nav is not None):
        soup.nav.extract()
    return soup

def clear_footers(soup):
    while(soup.footer is not None):
        soup.footer.extract()
    return soup

def clear_asides(soup):
    while(soup.aside is not None):
        soup.aside.extract()
    return soup

def clear_soup(soup):
    soup = clear_navbars(soup)
    soup = clear_asides(soup)
    soup = clear_footers(soup)
    return soup