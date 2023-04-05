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
    """Get all the isCompatible relationships from the database

    Args:
        graph (py2neo.Graph): The graph of the database

    Returns:
        list[dict]: A list of dictionary. Each dictionary is of the following form: :
            - id(a) - The ID of the first CompatibleTool
            - (a.name) - The name of the first CompatibleTool of the relationship
            - id(b) - The ID of the second CompatibleTool
            - (b.name) - The name of the second CompatibleTool of the relationship
    """
    return graph.run("MATCH (a:CompatibleTool)-[:isCompatible]->(b:CompatibleTool) RETURN id(a), a.name, id(b), b.name").data()


def get_ordered_compatible_tools(graph, limit=None, skip=None):
    """Get all the isCompatible relationships from the database in descending order of number of relationships.

    Args:
        graph (py2neo.Graph): The graph of the database
        limit (int, optional): The maximum number of results. Defaults to None.
        skip (int, optional): The number of results to skip. Defaults to None.

    Returns:
        list[dict]: A list of dictionary. Each dictionary is of the following form:
            - id(c) - The ID of the CompatibleTool
            - c.name - The name of the CompatibleTool
            - c.input - The list of CompatibleTool inputs
            - c.output - The list of CompatibleTool outputs
            - relationCounter - The number of isCompatible relations that start from the CompatibleTool
    """
    request = "MATCH (c:CompatibleTool)-[r:isCompatible]->(c2:CompatibleTool) WITH c, count(r) AS relationCounter ORDER BY relationCounter DESC RETURN id(c), c.name, c.input, c.output, relationCounter"
    if skip is not None:
        request += f" SKIP {skip}"
    if limit is not None:
        request += f" LIMIT {limit}"
    return graph.run(request).data()
   

def get_compatible_with_a_tool(graph, tool_name, limit=None):
    """Get the list of tool that are compatible with tool_name

    Args:
        graph (py2neo.Graph): The graph of the database
        tool_name (str): The name of the tool
        limit (int, optional): The maximum number of results. Defaults to None.

    Returns:
        list[dict]: A list of dictionary. Each dictionary is of the following form:
            - c2.name - The name of the tool that is compatible with tool_name
            - id(c2) - The ID of the tool that is compatible with tool_name
    """
    request = f"MATCH (c:CompatibleTool {{name: \"{tool_name}\"}})-[r:isCompatible]->(c2:CompatibleTool) RETURN c2.name, id(c2)"
    if limit is not None:
        request += f" LIMIT {limit}"
    return graph.run(request).data()
    # if limit is None:
    #     return graph.run(f"MATCH (c:CompatibleTool {{name: \"{tool_name}\"}})-[r:isCompatible]->(c2:CompatibleTool) RETURN c2.name, id(c2)").data()
    # else:
    #     return graph.run(f"MATCH (c:CompatibleTool {{name: \"{tool_name}\"}})-[r:isCompatible]->(c2:CompatibleTool) RETURN c2.name, id(c2) LIMIT {limit}").data()

def get_tool_from_id(graph, id):
    """Get the tool with a specific ID

    Args:
        graph (py2neo.Graph): The graph of the database
        id (int): The ID of the tool

    Returns:
        list[dict]: A list with an element which is a dictionary with c.name key.
    """
    return graph.run(f"MATCH (c:CompatibleTool) WHERE id(c) = {id} RETURN c.name, c.id").data()

def get_co_score_from_pmc(tool_name_1, tool_name_2):
    """Get the co-score between the tool_name_1 and the tool_name_2.

    Args:
        tool_name_1 (str): The name of the first tool
        tool_name_2 (str): The name of the second tool

    Returns:
        float: the co-score
    """
    with open((Path(__file__).parent / "data/resultPMC.json"), "r") as file:
        dr = json.load(file)
    
    max_value = max(dr["resultsPMC"].values())
    print(max_value)
    return dr["resultsPMC"].get(f"{tool_name_1}{tool_name_2}", 0)

def create_score_json():
    """Create the JSON file where the co-score will be stored.
    """
    g = connect_to_neo4j("neo4j", "bio4tdummy")
    req_data = get_compatible_tools(g)
    dict_res = {}
    list_res = []
    for dictionary in req_data:
        score_bt = coScore(dictionary["a.name"], dictionary["b.name"])
        score_pmc = get_co_score_from_pmc(dictionary["a.name"], dictionary["b.name"])
        if score_bt+score_pmc > 0:
            list_res.append({
                "tool1": dictionary["id(a)"],
                "name1": dictionary["a.name"],
                "tool2": dictionary["id(b)"],
                "name2": dictionary["b.name"],
                "score": score_bt + score_pmc
            })
    dict_res["items"] = list_res
    with open((Path(__file__).parent / "data/output_scoring.json").resolve(), "w") as fout:
        json.dump(dict_res, fout)

def make_pmc_json(skip = 0):
    """Create the JSON file where the co-score in PubMed will be stored

    Args:
        skip (int, optional): The number of results to skip. Defaults to 0.
    """
    g = connect_to_neo4j("neo4j", "bio4tdummy")
    
    if skip > 0:
        req_data = get_ordered_compatible_tools(g, skip=skip)
        with open((Path(__file__).parent / "data/resultPMC.json").resolve(), "r") as f:
            dr = json.load(f)
        dict_json = dr["resultsPMC"]
    else:
        req_data = get_ordered_compatible_tools(g)
        dict_json = {}

    for node_dict in req_data:
        if pmc_api.get_number_of_results(node_dict["c.name"]) > node_dict["relationCounter"]/(max(len(node_dict["c.input"]), len(node_dict["c.output"]))):
            for names_dict in get_compatible_with_a_tool(g, node_dict["c.name"]):
                nb_results = pmc_api.get_number_of_results(node_dict["c.name"], names_dict["c2.name"])
                if (nb_results > 0):
                    dict_json[f"{node_dict['c.name']}{names_dict['c2.name']}"] = nb_results
        dict_result = {"resultsPMC": dict_json}
        with open((Path(__file__).parent / "data/resultPMC.json").resolve(), "w") as fichier:
            json.dump(dict_result, fichier)

if __name__ == "__main__":
    # print(Path(__file__) / "../data/output_scoring2.json")
    # print((Path(__file__) / "../data/output_scoring2.json").resolve())
    # print((Path(__file__).parent / "data/output_scoring2.json").resolve())
    pass

