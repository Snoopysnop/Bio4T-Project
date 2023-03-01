import {draw_workflow_arrow} from "./workflowArrow.js";

export function resize(svg_force_directed_graph, svg_arrows, graph)
{
    let width = document.body.clientWidth;
    let height = 600;

    svg_force_directed_graph
        .attr('width', width)
        .attr('height', height);

    for (let i = 0; i < svg_arrows.length; i++) {
        svg_arrows[i]
            .attr('width', width)
            .attr('height', 190);
    }

    draw_workflow_arrow(svg_arrows, graph);
}