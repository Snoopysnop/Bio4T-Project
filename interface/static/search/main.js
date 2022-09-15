import {generate_graph_from_api_call} from "./modules/getGraphFromAPI.js";
import {Graph} from "./modules/forceDirectedGraph.js";
import {draw_workflow_arrow} from "./modules/workflowArrow.js";
import {generate_tools_list} from "./modules/listTools.js";
import {resize} from "./modules/event.js";

export async function main()
{
    let graph = await generate_graph_from_api_call();
    let force_directed_graph = new Graph(graph);
    let svg_arrows = [];
    draw_workflow_arrow(svg_arrows, graph);
    generate_tools_list(graph);

    window.addEventListener('resize',
        () =>
        {
            resize(force_directed_graph.graph_canvas, svg_arrows, graph);
        },
        false);

    resize(force_directed_graph.graph_canvas, svg_arrows, graph);
}

main().catch(error => {console.error(error);});