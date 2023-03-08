import requests
from xml.etree import ElementTree
import database_requests

def make_pmc_api_request(tool_name_1, tool_name_2, number_of_results = 10):
    """Make a request on PubMed API to get the list of publications which contains the tool_name_1 and the tool_name_2.

    Args:
        tool_name_1 (str): The name of the 1st tool
        tool_name_2 (str): The name of the 2nd tool
        number_of_results (int, optional): Number of results to return. Defaults to 10.

    Raises:
        Exception: Throw an exception when the request doesn't work.

    Returns:
        json: A JSON with the list of publication.
    """
    dict_params = {
        "query": f"{tool_name_1} AND {tool_name_2} AND (HAS_FT:Y) AND (((SRC:MED OR SRC:PMC OR SRC:AGR OR SRC:CBA) NOT (PUB_TYPE:\"Review\")))",
        "format": "json",
        "pageSize": number_of_results
    }
    response = requests.get(f"https://www.ebi.ac.uk/europepmc/webservices/rest/search", params=dict_params)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception("The request has failed.")

def get_scientific_article(article_id):
    """Get the scientific article content from an article_id

    Args:
        article_id (str): The ID of the article

    Returns:
        str: A string with the content of the article.
    """
    response = requests.get(f"https://www.ebi.ac.uk/europepmc/webservices/rest/{article_id}/fullTextXML")
    try:
        tree = ElementTree.fromstring(response.content)
        return ''.join(tree.find('body').itertext())
    except ElementTree.ParseError:
        return ''

def get_number_of_results(tool_name_1, tool_name_2):
    json_res = make_pmc_api_request(tool_name_1, tool_name_2)
    return json_res['hitCount']

def access_to_n_first_articles(tool_name_1, tool_name_2, n = 10):
    """Get the content of the n first article

    Args:
        tool_name_1 (str): The name of the 1st article
        tool_name_2 (str): The name of the 2nd article
        n (int, optional): The number of article. Defaults to 10.

    Returns:
        dict: A dictionary with the text assiociated with the ID of the articles.
        int: The total number of results.
    """
    dict_res = {}
    json_res = make_pmc_api_request(tool_name_1, tool_name_2, n)
    total_result = json_res['hitCount']
    print(total_result)
    for article in json_res['resultList']['result']:
        print(article['fullTextIdList']['fullTextId'][0])
        dict_res[article['fullTextIdList']['fullTextId'][0]] = get_scientific_article(article['fullTextIdList']['fullTextId'][0])
    
    return dict_res, total_result

def get_sentences_from_article(tool_name_1, tool_name_2):
    """Get the sentences in a article where the two tools are cited.

    Args:
        tool_name_1 (str): The name of the 1st tool
        tool_name_2 (str): The name of the 2nd tool

    Returns:
        list: A list of sentences
    """
    dict_res1, total_result1 = access_to_n_first_articles(tool_name_1, tool_name_2)
    list_res = []
    for text in dict_res1.values():
        list_res += database_requests.get_sentences_containing_n_words(database_requests.split_paragraph_in_sentences(text), [tool_name_1, tool_name_2])
    return list_res