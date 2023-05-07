import os
from flask import *
from flask_cors import CORS 
import sqlite3  
import json
from datetime import datetime
import Utils as dbUtils
import os

SERVER = os.getenv('NEOSERVER', "localhost")
PORT = os.getenv('NEOPORT', "7687")
IP = "bolt://%s:%s" %(SERVER,PORT)
print(IP)
def create_utils():
    return dbUtils.Utils(IP, "neo4j", "bio4tdummy")

def create_app():

    app = Flask(__name__)
    CORS(app)
    utils = create_utils()


    @app.route("/test", methods=['POST'])

    def test():
        '''data = request.get_json()
        print("La requête : "+data['json']['title'])
        return data['json']['title']'''
        context = request.get_json()["json"]
        parameters = dbUtils.Param(input=context['input'], output=context['output'], limit=context['limit'], depth=context['depth'])
        #connect.nodes[1234]
        # print("La requête : ")
        # print(builder.requete)
        # print("Le résultat : ")
        # print(json.dumps(result, indent=2))
        return ""
    
    @app.route("/getLabels", methods=['POST'])

    def getLabels():
        print(request)
        text = request.get_json()["json"]["label"]
        utils = create_utils()
        result = utils.request_topicsListWithFilter(text)
        jsonResult = json.dumps(result)
        print(jsonResult)
        return jsonResult
    
    @app.route("/getInputs", methods=['POST'])

    def getInputs():
        print(request)
        text = request.get_json()["json"]["input"]
        print(str(text))
        utils = create_utils()
        result = utils.request_InputListWithFilter(text)
        print(result)
        jsonResult = json.dumps(result)
        print()
        return jsonResult
    
    @app.route("/getOutputs", methods=['POST'])

    def getOutputs():
        print(request)
        text = request.get_json()["json"]["output"]
        utils = create_utils()
        result = utils.request_OutputListWithFilter(text)


        jsonResult = json.dumps(result)
        print()
        return jsonResult
    
    @app.route("/sendForm", methods=['POST'])

    def getWorkflow():
        print(request)
        input = request.get_json()["json"]["input"]
        output = request.get_json()["json"]["output"]
        label = request.get_json()["json"]["label"]
        depth = int(request.get_json()["json"]["depth"])
        limit = int(request.get_json()["json"]["limit"])
        print(input)
        print(output)
        print(label)
        print(depth)
        print(limit)

        utils = create_utils()
        result = utils.request_workflow(input, output, label, depth, limit)
        print(result)
        result_loop = json.loads(result)

        for res in result_loop:
            for x in res['workflows']:
                if 'toolID' in x:
                    tool = utils.request_ToolFromCompatibleTool(x['toolID'])
                    tool = json.loads(json.dumps(tool))
                    x.update({'description' : tool[0]['t']['description']})
                    x.update({'homepage' : tool[0]['t']['homepage']})
                # print(x)

        # print(result_loop)
        return json.dumps(result_loop)

    return app 

if __name__ == "__main__":
    app = create_app()  
    app.run(host='0.0.0.0', port=5000)  
