import os
from flask import *
from flask_cors import CORS 
import sqlite3  
import json
from datetime import datetime
import databaseUtils.Request_builder as request_Builder
import databaseUtils.Utils as databaseUtils

def create_utils():
    return databaseUtils.Utils("http://localhost:7687", "neo4j", "bio4tdummy")

def create_app():

    app = Flask(__name__)
    cors = CORS(app, resources={r"*": {"origins":"*"}})

    @app.route("/workflow-get", methods=['POST'])

    def search_workflow_api():
        '''data = request.get_json()
        print("La requête : "+data['json']['title'])
        return data['json']['title']'''
        context = request.get_json()["json"]
        parameters = databaseUtils.Param(input=context['input'], output=context['output'], limit=context['limit'], depth=context['depth'])
        utils = create_utils()
        result = utils.request_workflow(parameters)
        #connect.nodes[1234]
        # print("La requête : ")
        # print(builder.requete)
        # print("Le résultat : ")
        # print(json.dumps(result, indent=2))
        return result

    return app 

if __name__ == "__main__":
    app = create_app()  
    app.run(host='0.0.0.0', port=5000)  