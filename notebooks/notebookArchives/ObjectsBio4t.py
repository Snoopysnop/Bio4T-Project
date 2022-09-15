import json

import networkx
from networkx.readwrite import json_graph


class Operation:
    def __init__(self, uri="", term=""):
        uri = uri
        term = term

class Input:
    def __init__(self, data={}, format={}):
        data = data
        format = format

class Output:
    def __init__(self, data={}, format={}):
        data = data
        format = format

class Function:
    def __init__(self, ID=0, operation=[], input=[], output=[], note="", cmd=""):
        self.ID = ID
        self.operation = operation
        self.input = input
        self.output = output
        self.note = note
        self.cmd = cmd


class Tool:
    def __init__(self, ID=0, name="", description="", homepage="", biotoolsID=0, biotoolsCURIE=0, version=[], otherID=[], relation=[], function=Function(), toolType=[], topic=[],  OS=[], language=[], license="", collectionID=[], maturity="", cost="", accessibility="", elixirPlatform=[], elixirNode=[], elixirCommunity=[], link=[], download=[], documentation=[], publication=[], credit=[]):
        self.ID = ID
        self.name = name
        self.description = description
        self.homepage = homepage
        self.biotoolsID = biotoolsID
        self.biotoolsCURIE = biotoolsCURIE
        self.version = version
        self.otherID = otherID
        self.relation = relation
        self.function = function
        self.toolType = toolType
        self.topic = topic
        self.OS = OS
        self.language = language
        self.license = license
        self.collectionID = collectionID
        self.maturity = maturity
        self.cost = cost
        self.accessibility = accessibility
        self.elixirPlatform = elixirPlatform
        self.elixirCommunity = elixirCommunity
        self.link = link
        self.download = download
        self.documentation = documentation
        self.publication = publication
        self.credit = credit


### *********************************************** ###
class Workflow:
    def __init__(self, graph=networkx.Graph(), start=[], end=[]):
        self.FunctionList = graph
        self.start = start
        self.end = end

    def create_json(self):
        wf_json = {"start":self.start, "end":self.end}
        wf_json.update(json_graph.node_link_data(self.FunctionList))
        return json.dumps(wf_json, default=lambda o: o.__dict__, indent=4)

if (__name__ == '__main__'):
    t = Tool(32, "ATool", ["Linux", "Mac"])
    t.__setattr__('ID', 42)
    t.__setattr__('name', 'Another tool yeah')

    t2 = Tool(17)
    #print(j)
    #print(j2)

    f = Function(393, tool=t)

    f2 = Function(47, tool=t2)

    dico = {f.ID: [f2.ID]}

    G = networkx.Graph()
    G.add_node(1, data=f2.__dict__)
    w = Workflow(graph=G, start=[f], end=[f2])
    wj = w.create_json()
    print(wj)

