class Requete:
    def __init__(self, param):
        self.requete = ""
        self.param = param

    def creer_Requete(self):
        self.requete = ""

        # Première requête renvoyant les chemins avec les paramètres entrés dans Params
        self.requete = self.requete + f"""
            CALL {{
                MATCH path=(i:IO {{term: '{self.param.input}' }})-[:inputOf|outputOf *1..{self.param.depth}]->(o:IO {{term: '{self.param.output}' }})
                // WHERE pour éviter de boucler sur une même fonction
                WHERE NONE (n IN nodes(path) WHERE size([x IN nodes(path) WHERE n = x]) > 1 )
                RETURN path
                LIMIT {self.param.limit}
                }}
            """

        # Agrège tous les résultats dans une liste d'ID
        self.requete = self.requete + """//
            // pour l'instant un workflow est un unique chemin
            // mais est quand même représenté une liste de chemins (de 1 élément)
            WITH apoc.path.elements(path) AS pathAsList
            WITH [x in pathAsList | ID(x)] AS pathAsIdList
            WITH [pathAsIdList] AS workflow
            WITH collect(workflow) as workflowList
            """

        # Va chercher les infos nécessaires sur chaque outil utilisé dans les workflows
        self.requete = self.requete + """
            CALL {
                WITH workflowList
                UNWIND workflowList AS pathList
                UNWIND pathList AS pathAsIdList
                UNWIND pathAsIdList AS stepID // pour chaque étape de workflow
                // on va chercher l'outil qui contient la fonction utilisée
                // remarque : on filtre en même temps sur le type de noeud
                // si le noeud n'est pas une fonction, le match ne renvoie rien 
                // et on passe à la valeur suivante sans exécuter la suite
                MATCH (t:Tool)--(f:Function) WHERE ID(f)=stepID
                WITH { id:ID(f), label:labels(f)[0], properties: properties(f) } AS function,
                     { id:ID(t), label:labels(t)[0], properties: properties(t) } AS tool, f
                // on va maintenant chercher les entrées/sorties de la fonction
                CALL { // les entrées
                    WITH f
                    MATCH (f)-[i:inputOf]-(io: IO)
                    WITH { id:ID(io), label:labels(io)[0], properties: properties(io) } AS inputNode,
                         { id:ID(i), type:type(i), properties: properties(i)} AS ioRelation
                    RETURN {node: inputNode, relation: ioRelation} AS input
                }
                WITH collect(input) as inputList, function, tool, f
                CALL { // les sorties
                    WITH f
                    MATCH (f)-[o:outputOf]-(io: IO)
                    WITH { id:ID(io), label:labels(io)[0], properties: properties(io) } AS outputNode,
                         { id:ID(o), type:type(o), properties: properties(o)} AS ioRelation
                    RETURN {node: outputNode, relation: ioRelation} AS output
                }
                WITH collect(output) AS outputList, inputList, function, tool
                // on peut renvoyer toutes les informations intéressantes sur la fonction utilisée dans le workflow
                return { function: function, tool: tool, inputList: inputList, outputList: outputList} AS node
            }
            // on récupère le tout dans la liste 'nodes'
            WITH collect(node) AS nodes, workflowList
            """

        # Va chercher les infos sur les relations présentes dans les workflows
        # elles contiennent les formats des entrées/sorties
        self.requete = self.requete + """
            CALL {
                WITH workflowList
                UNWIND workflowList AS pathList
                UNWIND pathList AS pathAsIdList
                UNWIND pathAsIdList AS stepID
                WITH collect( DISTINCT stepID) as filtered // supprime les doublons
                UNWIND filtered AS stepID
                
                MATCH (a)-[r]->(b) WHERE ID(r)=stepID
                WITH ID(a) as s, ID(b) as e, r
                WITH { id:ID(r), start: s, end: e, properties: properties(r) } AS relationship
                RETURN relationship
            }
            WITH collect(relationship) AS relationships, nodes, workflowList
            """
        # Revoie le résultat formaté en json
        self.requete = self.requete + """
            RETURN { workflows: workflowList, nodes: nodes, relationships: relationships } AS result
            """
        return self.requete

    def getWorkflows(self, input, output, deepth):
        return f"""
        MATCH p = (t1:CompatibleTool)-[:isCompatible *0..{deepth}]->(t2:CompatibleTool)
        WHERE "{input}" IN t1.input AND "{output}" IN t2.output
        RETURN apoc.path.elements(p)
        """

    # Renvoie une liste de tous les topics des compatiblesTools
    def getAllTopics(self):
        return """
        MATCH (t:Topic)
        WHERE t.isInCompatibleTool
        RETURN t.term AS name
        """
    
    def getAllTopicsWithFilter(self, filter):
        return f"""
        CALL db.index.fulltext.queryNodes("topicSearch", '{filter} OR {filter}~ OR {filter}*') YIELD node, score
        WHERE node.isInCompatibleTool
        RETURN node.term AS name, score
        """
    
    def getAllInputs(self):
        return """
        MATCH (io:IO)
        WHERE io.isInputCompatibleTool
        RETURN io.term AS name
        """
    
    def getAllOutputs(self):
        return """
        MATCH (io:IO)
        WHERE io.isOutputCompatibleTool
        RETURN io.term AS name
        """
    
    def getAllInputsWithFilter(self, filter):
        return f"""
        CALL db.index.fulltext.queryNodes("ioSearch", '{filter} OR {filter}~ OR {filter}*') YIELD node, score
        WHERE node.isInputCompatibleTool
        RETURN node.term AS name, score
        """
    
    def getAllOutputsWithFilter(self, filter):
        return f"""
        CALL db.index.fulltext.queryNodes("ioSearch", '{filter} OR {filter}~ OR {filter}*') YIELD node, score
        WHERE node.isOutputCompatibleTool
        RETURN node.term AS name, score
        """
    
    def getToolFromCompatibleTool(self, filter):
        return f"""
        MATCH (t:Tool)
        WHERE t.biotoolsID = "{filter}"
        RETURN t
        """


def build_request_toolList():
    return """
        MATCH (t:Tool) WHERE ID(t) IN $idList
        WITH t, {} as res
        CALL {
            WITH t
            MATCH (t)--(f:Function)
            CALL {
                WITH f
                MATCH (f)-[format :inputOf]-(io:IO)
                WITH collect({format: [form in format.format | apoc.convert.fromJsonMap(form)], data: properties(io)}) AS input, f
                MATCH (f)-[format :outputOf]-(io:IO)
                WITH collect({format: [form in format.format | apoc.convert.fromJsonMap(form)], data: properties(io)}) AS output, input, f
                MATCH (f)-[:doOperation]-(op:Operation)
                WITH collect(properties(op)) AS operation, output, input
                RETURN input, output, operation
            }
            WITH collect(f{.*, input:input, output:output, operation:operation}) AS function
            RETURN function
        }
        CALL {
            WITH t
            MATCH (t)-[pubID]-(pub:Publication)
            RETURN collect(pubID{.*, metadata: properties(pub)}) AS publication
        }
        CALL { WITH t MATCH (t)--(lang:Language) RETURN collect(properties(lang)) as language }
        CALL { WITH t MATCH (t)--(link:Link) RETURN collect(properties(link)) as link }
        CALL { WITH t MATCH (t)--(d:Download) RETURN collect(properties(d)) AS download }
        CALL { WITH t MATCH (t)--(c:Credit) RETURN collect(properties(c)) AS credit }
        CALL { WITH t MATCH (t)--(d:Documentation) RETURN collect(properties(d)) AS documentation}
        CALL { WITH t MATCH (t)--(e:EditPermission) RETURN collect(properties(e)) AS editPermission}
        
        WITH collect(t{.*, neo4jId: ID(t), function: function,
                    link:link,
                    language:language,
                    publication:publication,
                    download:download,
                    credit:credit,
                    documentation:documentation,
                    editPermission:editPermission
                    }) AS tools, res
        UNWIND tools AS tool
            WITH apoc.map.setKey(res, apoc.convert.toString(tool['neo4jId']), tool) AS res
        RETURN collect(res) AS toolMap
                """


"""
if __name__ == "__main__":
    
    IP="bolt://localhost:7687"
    USER="neo4j"
    PASSWORD="pass"
    graph_db = Graph(IP, auth=(USER, PASSWORD))

    #Test
    r1 = Requete(p1)
    r1.creer_Requete()
    print(r1.requete)

    r = r1.requete
    result = graph_db.run(r)
    res = result.evaluate()
    print(json.dumps(res, indent=2))
"""
