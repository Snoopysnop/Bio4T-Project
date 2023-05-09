from py2neo import Graph
import Import
import os

if __name__ == "__main__":
    SERVER = os.getenv('NEOSERVER', "localhost")
    PORT = os.getenv('NEOPORT', "7687")
    IP = "bolt://%s:%s" %(SERVER,PORT)
    USER = "neo4j"
    PASSWORD = "bio4tdummy"
    graph_db = Graph(IP,  auth=(USER, PASSWORD))
    result = graph_db.run("MATCH (n) RETURN Count(*) AS NodeNumber").data()[0]
    if result['NodeNumber'] == 0:
        print("Initialisation de la base de donnée.")
        Import.importation(IP, USER, PASSWORD, "datatest_demo.json")
        Import.import_scoring(IP, USER, PASSWORD, "output_scoring.json", "trust_scores.json")
        print("Initialisation terminée")
    else:
        print("Base de donnée ok.")
    print("Fin d'initialisation")
