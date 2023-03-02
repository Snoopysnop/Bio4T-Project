import traceback

import databaseUtils.Request_builder as request_Builder
import databaseUtils.Utils as databaseUtils
import json


@api_view(['GET'])
def get_data(request, researched_str, query_type: str):
    nodes = []
    if query_type == "workflow_query":
        nodes = search_workflow_api(researched_str)
    elif query_type == "any_query":
        nodes = send_any_query_neo4j(researched_str)
    return Response(nodes)


@api_view(['POST'])
def search_workflow_api(request):
    context = json.loads(request.body.decode('utf8'))
    parameters = databaseUtils.Param(input=context['input'], output=context['output'], limit=context['limit'], depth=context['depth'])
    builder = request_Builder.Requete(parameters)
    builder.creer_Requete()
    utils = create_utils()
    result = utils.request(builder.requete)
    # print("La requête : ")
    # print(builder.requete)
    # print("Le résultat : ")
    # print(json.dumps(result, indent=2))
    return Response(result)


def send_any_query_neo4j(query_str: str):
    utils = create_utils()
    result = []
    print(query_str)
    try:
        result = utils.request(query_str)
    except Exception:
        result.append(traceback.format_exc())
    return result


def create_utils():
    return databaseUtils.Utils("neo4j://db:7687", "neo4j", "bio4tdummy")
