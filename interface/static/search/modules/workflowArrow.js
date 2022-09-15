import {string_to_colour, get_node_by_id_from_graph} from "./utils.js";
import {generate_modal_for_tool} from "./popup.js";

function draw_workflow_arrow(svg_arrows, graph)
{

    let width = document.body.clientWidth;
    /*
    TODO
    0. Trouver la hauteur maximal (essaye t'on de regrouper sur un etage commun les worlkflow qui se sépare
       regroupe à des instants différents de la chaine commune ?)
    1. Trouver la suite d'outils la plus commune du workflow
    2. Trouver la suite d'outils du workflow la plus grande, il va permettre de determiner la granularité de l'affichage
    3. Trouver le degres de séparation le plus grand entre chaque noeud du chemin central
    4. Construire les branches (Bien penser à changer les données au cours de la création pour ne garder
       que les elements restants à accrocher (on vire les noeuds du chemin commun) en SACHANT que ce n'est
       pas l'outil qu'on affiche la fonction sur celui-ci.
     */

    // Clear all arrow
    for (let i = 0; i < svg_arrows.length; i++)
    {
        svg_arrows[i].selectAll("*").remove();
        svg_arrows[i].remove();
    }

    for (let i = 0; i < graph.workflows.length; i++)
    {
        const workflow = graph.workflows[i];
        const height_lane = 150;

        let svg =   d3.select('#generated_arrow')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height_lane); // TODO Height depends du nombre de subWorkflow qui n'entre pas en contact

        svg .append("line")
            .attr("x1", 25)
            .attr("x2", width - 25)
            .attr("y1", height_lane/2)
            .attr("y2", height_lane/2)
            .attr("stroke", "#2b2b2b")
            .style("stroke-width", "10");

        svg_arrows.push(svg);

        for (let j = 0; j < workflow.length; j++)
        {
            const sub_workflow = workflow[j];
            let distance_between_node = (width - 100) / (sub_workflow.length - 1);
            let circleX = 50;

            for (let k = 0; k < sub_workflow.length; k++)
            {
                let currentNode = get_node_by_id_from_graph(sub_workflow[k], graph.nodes);
                let node_name = currentNode.tool.properties.name;
                let parent = svg    .append("g")
                                    .attr("transform", "translate(" + circleX + "," + height_lane/2 + ")");

                parent  .append("circle")
                        .attr('r', 50)
                        .attr("fill", string_to_colour(node_name))
                        .on('click', () => generate_modal_for_tool(currentNode));

                parent.append("foreignObject")
                    .attr("x",-50)
                    .attr("y",-50)
                    .attr("width",100)
                    .attr("height",100)
                    .attr("pointer-events", "none")
                    .append("xhtml:div")
                    .style("position", "absolute")
                    .style("top", "50%")
                    .style("left", "50%")
                    .style("transform", "translate(-50%, -50%)")
                    .style("text-align", "center")
                    .style("font-size", "15px")
                    .text(node_name);
                circleX += distance_between_node;
            }
        }
    }
}

export {draw_workflow_arrow};