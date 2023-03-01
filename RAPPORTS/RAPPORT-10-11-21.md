# Etat actuel
Docker-compose -> ok apoc (var environment)
               -> -v ./data:/import
            
Améliorer la requête -> importation Tools, Function, IO : 
        il est possible de faire T -hasFunction-> F -hasInput/hasOutput-> IO -> F2 -> T2

1ere version du site web, connecté par défault à une base de donnée neo4j. Moteur de recherche en full-text

# Objectif
Rendu : du général vers le plus précis :

    - De la bioinformatique à pourquoi il est nécessaire d'avoir un moteur de recherche. 
    - Pourquoi nous VS les autres (biotools, omicsTools, pubmed, litteratures). 
    - Pourquoi les graphes ? Pourquoi une nouvelles interfaces ? 
    - Neo4j / GraphDB / Sparql - triple store sujet,predicat,objet ?

# TODO
- Joindre publications, i/o, langages, auteurs, os, mot-clés
- Se renseigner pour le textmining des publications et/ou des readme de git

    
    PLAN : 
    - Bio info  
    - Besoin
    - solutions existantes
        - omics tools
        - bio tools
        - littérature scientifiques / medpub
        - bouche à oreille
    - nous VS biotools
    - Nos choix : 
        - interface 
            - recup le git de bio.tools
            - ou faire un site
        - graphe
            - base de donnée en table
    - Nos choix de techno
        - neo4j
        - sparql
        - graphDB
        - python / jupyter
    - gestion de projet
        - choix des logiciel 
            - docker
            - git
            - Discord ?
            - googledoc ?
        - Teambuilding ?
        - des jolis schéma 
    - bibliographie 


