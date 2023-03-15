import json
import py2neo
from nltk import tokenize
import pmc_api
from co_score.coScore import coScore
from pathlib import Path


def connect_to_neo4j(user, password):
    """Function to connect to the Neo4J database

    Args:
        user (str): the username for the database
        password (str): the password for the database

    Returns:
        py2neo.Graph: The graph of the database.
    """
    return py2neo.Graph("bolt://localhost:7687", auth=(user, password))

def is_compatible(graph, tool_name_1, tool_name_2):
    """Check if two tools have a isCompatible relationship in the database

    Args:
        graph (py2neo.Graph): The database
        tool_name_1 (str): The name of the 1st tool
        tool_name_2 (str): The name of the 2nd tool

    Returns:
        bool: True if the relationship isCompatible exists.
    """
    query = f"MATCH (a:Tool {{name: \"{tool_name_1}\"}}), (b:Tool {{name: \"{tool_name_2}\"}}) RETURN exists((a)-[:isCompatible]->(b))"
    res = graph.run(query).data()
    return list(res[0].values())[0]

def save_query_result(query, outfile_name, graph):
    """Save the result of a query in a JSON file

    Args:
        query (str): The query in Cypher
        outfile (str): The name of the file where the result will be saved
        graph (py2neo.Graph): The database
    """
    with open(f"{outfile_name}.json", "w") as f:
        f.write(json.dumps(graph.run(query).data()))

def split_paragraph_in_sentences(paragraph):
    """Split a paragraph into a list of sentences.

    Args:
        paragraph (str): The paragraph

    Returns:
        list[str]: The list of sentences in the paragraph.
    """
    return tokenize.sent_tokenize(paragraph)


def get_sentences_containing_n_words(sentence_list: list[str], words: list[str]):
    """Get only the sentences that contains all the word in words list.

    Args:
        sentence_list (list[str]): The list of sentence
        words (list[str]): The list of word which had to be contained in the sentence

    Returns:
        list[str]: The list of sentences that contains all the words.
    """
    res = []
    words = [word.lower() for word in words]
    for sentence in sentence_list:
        if all([x in sentence.lower() for x in words]):
            res.append(sentence)
    return res

def get_compatible_tools(graph):
    return graph.run("MATCH (a:CompatibleTool)-[:isCompatible]->(b:CompatibleTool) RETURN id(a), a.name, id(b), b.name").data()

def create_json():
    g = connect_to_neo4j("neo4j", "bio4tdummy")
    req_data = get_compatible_tools(g)
    dict_res = {}
    list_res = []
    for dictionary in req_data:
        list_res.append({
            "tool1": dictionary["id(a)"],
            "name1": dictionary["a.name"],
            "tool2": dictionary["id(b)"],
            "name2": dictionary["b.name"],
            "score": coScore(dictionary["a.name"], dictionary["b.name"]) + pmc_api.get_number_of_results(dictionary["a.name"], dictionary["b.name"])
        })
    dict_res["items"] = list_res
    print(dict_res)
    with open((Path(__file__) / "../data/output_scoring.json").resolve(), "w") as fout:
        json.dump(dict_res, fout)

if __name__ == "__main__":
    # g = connect_to_neo4j("neo4j", "bio4tdummy")
    create_json()
    # save_query_result("MATCH (a:Tool)-[:isCompatible]->(b:Tool) RETURN id(a), a.name, id(b), b.name", "./data/tooolsCompatible.json", g)
    # sentences = ["Bonjour", "Au revoir", "Bonjour, je m'appelle Jean-Baptiste. Au revoir"]
    # paragraph = "BBMap/BBTools are now open source. Please try it out - it's a 3MB download, and written in pure Java, so installation is trivial - just unzip and run. Handles all sequencing platforms (Illumina, PacBio, 454, Sanger, Nanopore, etc) except Solid colorspace, which I removed to simplify the code."
    # print(get_sentences_containing_n_words(sentences, ["Bonjour", "Au revoir"]))
    # print(type(split_paragraph_in_sentences(paragraph)))
