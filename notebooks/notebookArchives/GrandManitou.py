import json
import sys

import networkx as nx

import Request_builder
import ObjectsBio4t
from py2neo import Graph
import networkx
from networkx.readwrite import json_graph


def save_json_file(filename,graph):
    g = graph
    g_json = json_graph.node_link_data(g)
    json.dump(g_json,open(filename,'w'),indent=2)


def reformData(data):
    fct = ObjectsBio4t.Function(ID=data["function"]["id"], tool=data["tool"])

def parseJson(filename="resNeo4j.json"):
    with open(filename) as json_data:
        listWorkFlow = []
        data_dict = json.load(json_data)
        G = nx.Graph()
        for graph in data_dict["paths"]:
            #for path in graph:
            path = graph
            for i in range(len(path)):  # i indice du tableau du chemin
                if i % 2 == 0:  # si c'est l'id d'une fonction
                    data = [x for x in data_dict["nodes"] if x["function"]["id"] == path[i]]
                    if len(data) == 0:
                        print(path[i])
                        print("fonction inexistante")
                        sys.exit(0)
                    else:
                        data = data[0]
                    reformData(data)
                    G.add_node(path[i], data=data)
            for i in range(len(path)):  # i indice du tableau du chemin
                if i % 2 == 1:  # si c'est l'id d'un edge
                    data = [x for x in data_dict["relationships"] if x["id"] == path[i]]
                    if len(data) == 0:
                        print(path[i])
                        print("edge inexistante")
                        sys.exit(0)
                    else:
                        data = data[0]
                    G.add_edge(data["start"], data["end"], data=data["properties"])


def main():
    param = Request_builder.Param("Sequence", "Alignment")
    request = Request_builder.Requete(param)

    req = request.creer_Requete()

    print(req)

    IP="bolt://localhost:7687"
    USER="neo4j"
    PASSWORD="pass"
    graph_db = Graph(IP, auth=(USER, PASSWORD))

    resBrut = graph_db.run(req)
    tree = resBrut.data()[0]['workflow']
    aff = json.dumps(tree, indent=2)
    print(aff)

    listWorkflow = []
    # TODO parcourir l'arbre pour formater le graphe
    # TODO create json à partir de la liste


# TODO Renommer fichier py
if (__name__ == '__main__'):
    main()