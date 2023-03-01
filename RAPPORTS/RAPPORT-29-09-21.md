# Etat actuel
Base de données 22k élements, relations gérées par les tags (e.g: ontologie, input/output, langage, os, etc...), on peut simplement faire une recherche sur ces tags.
# Objectif
Crée de nouveaux liens, plus large que les relations actuels basé sur les tags.  
Utiliser un modèle de graph pour crée des relations à l'aides des chemins découverts entre les différentes outils (e.g: une liste d'input/output).  
Chercher des informations supplémentaire dans le readme des gits disponible.  
Chercher des infos plus précise pour l'ontologie dans les gits.  
Chercher dans les citations pubmeb trouvable sur chaque outil pour crée des liens entre les outils.  
# Outils/Rapport
- On utilise neo4j il faudrait comparer avec les autres outils pour argumenter notre décision d'utiliser neo4j.
- neo4j est gratuit et plus simple à apprendre que les autres outils (Graphdb (Mieux mais payant), RDF/SPARQL(Complexe)), NEO4j est open-source.
# TODO
- Reactome utlisee neo4j + solr: étudier pour voir si utilisable dans notre projet. 
- Doit on faire une interface?
- Apprendre CYPHER. 
- Se renseigner pour le textmining des publications et/ou des readme de git
![alt text](pictures/SchemaGlobalProjet.png)
