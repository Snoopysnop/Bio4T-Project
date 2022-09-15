function generate_tools_list(graph)
{
    const divToAttach = document.getElementById("generated_form");

    for (let i = 0; i < graph.nodes.length; i++) {
        const form = document.createElement("form");
        form.textContent = graph.nodes[i].tool.properties.name;
        divToAttach.appendChild(form);
    }
}

export {generate_tools_list};