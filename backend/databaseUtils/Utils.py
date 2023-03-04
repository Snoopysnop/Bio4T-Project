from py2neo import *
import json

from Request_builder import build_request_toolList, Requete


class Param:
    def __init__(self, input="", output="", depth=5, limit=10):
        self.input = input
        self.output = output
        self.depth = depth
        self.limit = limit

    def set_input(self, input):
        self.input = input

    def set_output(self, output):
        self.output = output

    def set_depth(self, depth):
        self.depth = depth

    def set_limit(self, limit):
        self.limit = limit


class Utils:
    def __init__(self, ip="", user="", password=""):
        self.ip = ip
        self.user = user
        self.password = password

    def connect(self):
        return Graph(self.ip, auth=(self.user, self.password))

    def request_toolList(self, listId):
        params = {'idList': listId}
        graph_db = self.connect()
        result = graph_db.run(build_request_toolList(), params)
        return result.data()

    def request_workflow(self, param):
        graph_db = self.connect()
        requete = Requete(param)
        result = graph_db.run(requete.creer_Requete())
        return result.data()
    
    def request_topicsList(self):
        graph_db = self.connect()
        requete = Requete(None)
        result = graph_db.run(requete.getAllTopics())
        return result.data()
    
    def request_topicsListWithFilter(self,filter):
        #TODO vérifier le paramètre pour éviter l'injection de code
        graph_db = self.connect()
        requete = Requete(None)
        result = graph_db.run(requete.getAllTopicsWithFilter(filter))
        return result.data()

    def request(self, req):
        graph_db = self.connect()
        result = graph_db.run(req)
        return result.data()


if __name__ == "__main__":
    utils = Utils("bolt://localhost:7687", "neo4j", "bio4tdummy")
    print(utils.request_topicsListWithFilter('bio'))
