import os
from fastapi import FastAPI, Request
import sqlite3  
import json
from datetime import datetime
import Utils as dbUtils
import uvicorn

def create_utils():
    return dbUtils.Utils("bolt://localhost:7687", "neo4j", "bio4tdummy")

# def create_app():

app = FastAPI()
utils = create_utils()

@app.post("/getLabels")

async def getLabels(request: Request):
    print(request)
    text = request.get_json()["json"]["input"]
    utils = create_utils()
    result = utils.request_topicsListWithFilter(text)
    jsonResult = json.dumps(result)
    print(jsonResult)
    return jsonResult

@app.post("/getInputs")

async def getInputs(request: Request):
    print(request)
    text = request.get_json()["json"]["input"]
    print(str(text))
    utils = create_utils()
    result = utils.request_InputListWithFilter(text)
    print(result)
    jsonResult = json.dumps(result)
    print()
    return jsonResult

@app.post("/getOutputs")

async def getOutputs(request: Request):
    print(request)
    text = request.get_json()["json"]["input"]
    utils = create_utils()
    result = utils.request_OutputListWithFilter(text)

    jsonResult = json.dumps(result)
    print()
    return jsonResult

    # return app 

if __name__ == "__main__":
    # app = create_app()  
    uvicorn.run(app, host="0.0.0.0", port=5000)