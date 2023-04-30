from py2neo import Graph
import sys
import os
def importation(ip, user, password, file):
    print("=============",ip )
    graph_db = Graph(ip, auth=(user, password))

    # Nettoyage avant importation
    print("Nettoyage de la base de donnée.")
    res = graph_db.run("""CALL apoc.periodic.commit("MATCH (n) DETACH DELETE n RETURN Count(*) LIMIT 10000", {limit:10000});""")

    print("Base de donnée vidée: ", res)

    print("Importation depuis le fichier ", file)
    # Création du graphe de donnée
    # voir page 17 de l'api bio.tools pour un exemple presque complet
    commande = """CALL apoc.periodic.iterate(
        "CALL apoc.load.json('file:///"""+file+"""', '$.list') YIELD value RETURN value AS tool",
        "MERGE (t:Tool {name: tool.name})
            ON CREATE SET t.description= tool.description, 
                        t.homepage= tool.homepage,
                        t.license= tool.license,
                        t.collectionID= tool.collectionID,
                        t.maturity= tool.maturity,
                        t.cost= tool.cost,
                        t.accessibility= tool.accessibility,
                        // Check if complex datatype for elixir..
                        t.elixirPlatform= tool.elixirPlatform,
                        t.elixirNode= tool.elixirNode,
                        t.elixirCommunity= tool.elixirCommunity,
                        //TODO add community (Map mais pas dans l'exemple page 17)
                        //t.community = tool.community,
                        t.owner = tool.owner,
                        t.additionDate= tool.additionDate,
                        t.lastUpdate= tool.lastUpdate,
                        t.validated= tool.validated,
                        t.homepageStatus= tool.homepage_status,
                        t.elixirBadge= tool.elixir_badge,
                        t.confidenceFlag= tool.confidence_flag,
                        t.biotoolsID = tool.biotoolsID
                        
            
            foreach (function in tool.function |
                CREATE (f:Function {note: function.note, cmd: function.cmd})
                MERGE (t)-[:hasFunction]-(f)
                
                //add the operations of the functions
                foreach(operation in function.operation |
                    MERGE (op:Operation {term: operation.term, uri: operation.uri})
                    MERGE (f)-[:doOperation]-(op)
                )
                
                //add the inputs of the function
                foreach(input in function.input |
                    MERGE (i:IO {term: input.data.term, uri: input.data.uri})
                        ON CREATE 
                            SET i.isInputCompatibleTool = false
                    MERGE (i)-[rel:inputOf]->(f)
                    SET rel.format = []
                    // the formats are linked to the function via the relation
                    foreach(format in input.format |
                        SET rel.format = rel.format + apoc.convert.toJson({term:format.term, uri: format.uri})
                    )
                )
    
                //add the outputs of the function
                foreach(output in function.output |
                    MERGE (o:IO {term: output.data.term, uri: output.data.uri})
                        ON CREATE
                            SET o.isOutputCompatibleTool = false
                    MERGE (o)<-[rel:outputOf]-(f)
                    SET rel.format = []
                    // the formats are linked to the function via the relation
                    foreach(format in output.format |
                        SET rel.format = rel.format + apoc.convert.toJson({term:format.term, uri: format.uri})
                    )
                )
            )
                
            //add tooltype of the node
            SET t.toolType=[]
            foreach (toolType in tool.toolType |
                SET t.toolType = t.toolType + toolType
            )
    
            //add the topics
            foreach(topic in tool.topic |
                MERGE (top:Topic {term: topic.term, uri:topic.uri, isInCompatibleTool: false})
                MERGE (t)-[:Topic]-(top)
            )
    
            //add OSs
            foreach(operatingSystem in tool.operatingSystem |
                MERGE (os:OS {name: operatingSystem})
                MERGE (t)-[:OS]-(os)
            )
    
            //add languages
            foreach(language in tool.language |
                MERGE (l:Language {name:language})
                MERGE (t)-[:Language]-(l)
            )
    
            //add links
            foreach (link in tool.link |
                CREATE (l:Link {url: link.url, type: link.type, note: link.note})
                CREATE (t)-[:Link]->(l)
            )
    
            //add publications (ids of the publication in the relation, then metadata in the node
            foreach(pub in tool.publication |
                CREATE (p:Publication {title: pub.metadata.title,
                                    abstract: pub.metadata.abstract,
                                    date: pub.metadata.date,
                                    citationCount: pub.metadata.citationCount,
                                    authors: [], // authors is a list of Map{name->String}
                                    journal: pub.metadata.journal })
                foreach(author in pub.metadata.authors | SET p.authors= p.authors + author['name']) // create the list of authors
    
                CREATE (t)-[:Publication {doi: pub.doi,
                                        pmid: pub.pmid,
                                        pmcid: pub.pmcid,
                                        type: pub.type,
                                        version: pub.version,
                                        note: pub.note} ]   ->(p)
            )
    
            //credits
            foreach(credit in tool.credit |
                CREATE (cred:Credit {name: credit.name,
                                    email: credit.email,
                                    url: credit.url,
                                    orcidid: credit.orcidid,
                                    gridid: credit.gridid,
                                    rorid: credit.rorid,
                                    fundrefid: credit.fundredid,
                                    typeEntity: credit.typeEntity,
                                    typeRole: credit.typeRole,
                                    note: credit.note })
                CREATE (t)-[:Credit]->(cred)
            )
    
            //edit permission
            CREATE (ep:EditPermission {type: tool.editPermission.type,
                                       authors: tool.editPermission.authors })
            CREATE (t)-[:EditPermission]->(ep)
    
            //downloads
            foreach(dl in tool.download |
                CREATE (d:Download {url: dl.url, type: dl.type, note: dl.note, version: dl.version})
                CREATE (t)-[:Download]->(d)
            )
    
            //documentation
            foreach(dc in tool.documentation |
                CREATE (d:Documentation {url:dc.url, type: dc.type, note: dc.note})
                CREATE (t)-[:Documentation]->(d)
            )
            ",
            {batchSize:1000, iterateList:true}) YIELD timeTaken, batches, committedOperations RETURN timeTaken, batches, committedOperations
        """
    res = graph_db.run(commande)
    
    # création du graphe de requête
    # outils seul ayant 1 output ou plus et 1 input ou plus donne nouveau CompatibleTool
    graph_db.run(""" 
    MATCH (output:IO)<-[:outputOf]-(f:Function)<-[:inputOf]-(input:IO), (topic:Topic)<-[]-(t:Tool)-[:hasFunction]->(f)
    SET topic.isInCompatibleTool = true, 
        input.isInputCompatibleTool = true,
        output.isOutputCompatibleTool = true
    MERGE (ct:CompatibleTool {name: t.name})
        ON CREATE
            SET ct.input = [input.term],
                ct.output = [output.term],
                ct.topics = [topic.term],
                ct.toolID = t.biotoolsID,
                ct.trustScore = 0
        ON MATCH
            SET ct.input = CASE WHEN input.term IN ct.input THEN ct.input ELSE ct.input + [input.term] END,
                ct.output = CASE WHEN output.term IN ct.output THEN ct.output ELSE ct.output + [output.term] END,
                ct.topics = CASE WHEN topic.term IN ct.topics THEN ct.topics ELSE ct.topics + [topic.term] END
    """)

    # Workflow composé de plusieurs CompatibleTool. 
    # Le lien entre 2 compatibleTool se fait si compatibleTool1.output = compatibleTool2.input
    graph_db.run(""" 
    MATCH (outputFinal:IO)<-[:outputOf]-(f1:Function)<-[:inputOf]-(inout:IO)<-[:outputOf]-(f2:Function)<-[:inputOf]-(inputInit:IO),
    (t1:Tool)-[:hasFunction]->(f1), (t2:Tool)-[:hasFunction]->(f2), (ct1:CompatibleTool), (ct2:CompatibleTool)
    WHERE ct1.name = t1.name AND ct2.name = t2.name AND t1<>t2
    MERGE (ct1)<-[comp:isCompatible]-(ct2)
        ON CREATE
            SET comp.format = [inout.term],
                comp.score = 0
        ON MATCH
            SET comp.format = CASE WHEN inout.term IN comp.format THEN comp.format ELSE comp.format + [inout.term] END
    """)

    # Indexation sur les Topics
    graph_db.run("""
    CREATE FULLTEXT INDEX topicSearch IF NOT EXISTS FOR (t:Topic) ON EACH [t.term]
    """)

    # Indexation sur les IO
    graph_db.run("""
    CREATE FULLTEXT INDEX ioSearch IF NOT EXISTS FOR (io:IO) ON EACH [io.term]
    """)
    
    print("Importation terminée :")
    print(res.to_table())

def import_scoring(ip, user, pw, jsonCoscore, jsonTrustScore):
    graph_db = Graph(ip, auth=(user, pw))
    graph_db.run("""CALL apoc.load.json('file:///"""+jsonCoscore+"""') YIELD value
        UNWIND value.items AS item
        MATCH (a:CompatibleTool)-[r:isCompatible]->(b:CompatibleTool)
        WHERE a.toolID=item.tool1 AND b.toolID=item.tool2
        SET r.score = item.score
        """)
    graph_db.run("""CALL apoc.load.json('file:///"""+jsonTrustScore+"""') YIELD value
        UNWIND value.items AS item
        MATCH (a:CompatibleTool)
        WHERE a.toolID=item.id
        SET a.trustScore = item.trust_score
        """)


def clear_database(ip, user, password):
    graph_db = Graph(ip, auth=(user, password))
    res = graph_db.run(
        """CALL apoc.periodic.commit("MATCH (n) DETACH DELETE n RETURN Count(*) LIMIT 10000", {limit:10000});""")



if __name__ == "__main__":
    SERVER = os.getenv('NEOSERVER', "localhost")
    PORT = os.getenv('NEOPORT', "7687")
    IP = "bolt://%s:%s" %(SERVER,PORT)
    USER = "neo4j"
    PASSWORD = "bio4tdummy"
    print(IP)
    importation(IP, USER, PASSWORD, "datatest.json")
    import_scoring(IP, USER, PASSWORD, "output_scoring.json")
