export async function generate_graph_from_api_call()
{
    // récupère les paramètres et envoie la requête à l'api
    let body = {'input': input, 'output': output, 'limit': limit, 'depth': depth};
    let url = '/api_rest/'+query_type;
    const response = await fetch(url, {method:'POST', body: JSON.stringify(body)});
    const json = await response.json();

    console.log("le json :");
    console.log(json[0].result);
    /** Récupération du graphe */
    let graph =
        {
            nodes: [],
            workflows: [],
            links: [],
        };

    const nodes = json[0].result.nodes;
    const workflows = json[0].result.workflows;
    const relationships = json[0].result.relationships;

    // ajoute les noeuds (id des fonctions) dans le graphe
    for (let i = 0; i < nodes.length; i++)
    {
        let node = nodes[i];
        graph.nodes.push(node);
    }

    // ajoute les workflows (un workflow => plusieurs chemins => suite de noeuds)
    for (let i = 0; i < workflows.length; i++)
    {
        let workflow = [];
        let paths = workflows[i];
        for (let j = 0; j < paths.length; j++)
        {
            let path = [];
            for (let k = 2; k < paths[j].length; k+=4)
            {  // ajoute les noeuds correspondants aux fonctions dans le graphe
                path.push(paths[j][k]);
            }
            workflow.push(path);
        }
        graph.workflows.push(workflow);
    }

    // ajoute les liens entre les noeuds
    // Parmi tous les workflows
    for (let i = 0; i < graph.workflows.length; ++i)
    {
        let workflow = graph.workflows[i];
        // Parmi tous les chemins parallèles
        for (let j = 0; j < workflow.length; j++)
        {
            let path = workflow[j];
            // Parmi les noeuds d'un workflow
            for (let k = 1; k < path.length; ++k)
            {
                let newLinks = {source: path[k - 1], target: path[k]};
                let alreadyPresent = false;

                if (newLinks.source === newLinks.target) continue;
                for (let m = 0; m < graph.links.length; m++)
                {
                    if(graph.links[m].source === newLinks.source && graph.links[m].target === newLinks.target || graph.links[m].target === newLinks.source && graph.links[m].source === newLinks.target)
                    {
                        alreadyPresent = true;
                        break;
                    }
                }
                if (!alreadyPresent) graph.links.push(newLinks);
            }
        }
    }
    return graph;
}