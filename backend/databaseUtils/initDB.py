from py2neo import Graph
import Import

if __name__ == "__main__":
    IP = "bolt://localhost:7687"
    USER = "neo4j"
    PASSWORD = "bio4tdummy"
    graph_db = Graph(IP,  auth=(USER, PASSWORD))
    result = graph_db.run("MATCH (n) RETURN Count(*) AS NodeNumber").data()[0]
    if result['NodeNumber'] == 0:
        print("Initialisation de la base de donnée.")
        Import.importation(IP, USER, PASSWORD, "datatest.json")
        Import.import_scoring(IP, USER, PASSWORD, "output_scoring.json", "trust_scores.json")
        print("Initialisation terminée")
    else:
        print("Base de donnée ok.")
    print("Fin d'initialisation")
