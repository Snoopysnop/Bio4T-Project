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
        self.graph = Graph(ip, auth=(self.user, self.password))

    def connect(self):
        return Graph(self.ip, auth=(self.user, self.password))

    def request_toolList(self, listId):
        params = {'idList': listId}
        graph_db = self.connect()
        result = graph_db.run(build_request_toolList(), params)
        return result.data()

    def request_workflowOld(self, param):
        graph_db = self.connect()
        requete = Requete(param)
        result = graph_db.run(requete.creer_Requete())
        return result.data()
    
    def request_workflow(self, input, output, label, depth, limit):
        graph_db = self.connect()
        requete = Requete(None)
        result = graph_db.run(requete.getWorkflows(input, output, depth))
        data = json.loads(json.dumps(result.data()))

        #On trie les workflows reçus
        
        
        nbAcceptedWorkflow = 0
        workflow_tab = []       #le tab des worklows que l on va accepter
        workflow_id = 0         #on colle un id pour chaque workflow
        for i in data :         #on parcourt les 'workflows'
            score = 0
            co_score = 0
            trust_score = 0
            nbTools = 1
            Btopic = False
            for j in range(1,len(i["workflows"]),2):   #on parcourt les elements de la liste 'workflows' de 2 en 2 car le score est entre 2 tools
                nbTools +=1
                co_score += i["workflows"][j]["score"]    #recup la valeur de l id score
            for j in range(0,len(i["workflows"]),2):
                trust_score += i["workflows"][j]["trustScore"]
                score = (0.6*trust_score + 0.4*co_score)/((2*nbTools)-1)
                if(label in i["workflows"][j]["topics"]):
                    Btopic = True
            if(Btopic == True):
                workflow_tab.append((score,workflow_id))    #score : moyenne en f du nb d outils
                nbAcceptedWorkflow+=1 
            workflow_id += 1 

        workflow_tab = Utils.quicksort(workflow_tab)      #on trie pour avoir le meilleur score

        nbToWrite = nbAcceptedWorkflow
        if(nbAcceptedWorkflow>limit):
            nbToWrite = limit

        workflows = []
        for i in range(nbToWrite):     #on rebuild le json mais dans le bon ordre et seulement avec les workflow utiles
            (score,pos) = workflow_tab[i]
            workflows.append(data[pos])
        return json.dumps(workflows)

    def quicksort(tab):
        if len(tab) <= 1:  # Cas de base 
            return tab
        
        (pivot,id) = tab[0] # ça prend le score et on divise la liste en 2 
        left = [(x,id) for (x,id) in tab[1:] if x >= pivot]
        right = [(x,id) for (x,id) in tab[1:] if x < pivot]
        
        left = Utils.quicksort(left) # Trie recursivement chaque sous-liste
        right = Utils.quicksort(right)
        
        return left + [(pivot,id)] + right # Concat les sous-listes triees pour obtenir la liste triee complete
    
    def request_topicsListWithFilter(self,filter):
        #TODO vérifier le paramètre pour éviter l'injection de code
        graph_db = self.connect()
        requete = Requete(None)
        if (filter == ''):
            result = graph_db.run(requete.getAllTopics())
        else:
            result = graph_db.run(requete.getAllTopicsWithFilter(filter))
        return result.data()
    
    def request_InputListWithFilter(self,filter):
        #TODO vérifier le paramètre pour éviter l'injection de code
        graph_db = self.connect()
        requete = Requete(None)
        if (filter == ''):
            result = graph_db.run(requete.getAllInputs())
        else:
            result = graph_db.run(requete.getAllInputsWithFilter(filter))
        return result.data()
    
    def request_OutputListWithFilter(self,filter):
        #TODO vérifier le paramètre pour éviter l'injection de code
        graph_db = self.connect()
        requete = Requete(None)
        if (filter == ''):
            result = graph_db.run(requete.getAllOutputs())
        else:
            result = graph_db.run(requete.getAllOutputsWithFilter(filter))
        return result.data()

    def request_ToolFromCompatibleTool(self,filter):
        #TODO vérifier le paramètre pour éviter l'injection de code
        graph_db = self.connect()
        requete = Requete(None)
        result = graph_db.run(requete.getToolFromCompatibleTool(filter))
        return result.data()

    def request(self, req):
        graph_db = self.connect()
        result = graph_db.run(req)
        return result.data()



# TODO: A retirer. Utilisé juste pour les tests
if __name__ == "__main__":
    utils = Utils("bolt://localhost:7687", "neo4j", "bio4tdummy")
    print(utils.request_workflow("Accession", "Sequence alignment", "Nucleic acids", 4, 10))
