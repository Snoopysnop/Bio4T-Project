function generate_modal_for_tool(node)
{
    // Get the modal
    modal.style.display = "block";

    let information = d3.select("#information_on_tool_modal");
    information.selectAll('*').remove();
    // Tool name
    let name_row = information.append("p").attr("class","modal-header");
    name_row.append("span").style("font-size", "30px").text(node.tool.properties.name);
    name_row.append("span").text("       " + node.tool.properties.owner);
    // Tool website
    if(node.tool.properties.hasOwnProperty("homepage"))
        information.append("a").attr("href",node.tool.properties.homepage).text(node.tool.properties.homepage);
    let badge_row = information.append("p");
    // Tool type
    if(node.tool.properties.hasOwnProperty("toolType"))
    {
        for(let i = 0; i < node.tool.properties.toolType.length; ++i)
        {
            badge_row.append("span").attr("class","chip").text(node.tool.properties.toolType[i]);
        }
    }
    // Tool licence
    if(node.tool.properties.hasOwnProperty("license"))
        if (node.tool.properties.license !== "Other")
            badge_row.append("span").attr("class","chip").text(node.tool.properties.license);
    // Tool accessibility
    if(node.tool.properties.hasOwnProperty("accessibility"))
        badge_row.append("span").attr("class","chip").text(node.tool.properties.accessibility);
    // Tool cost
    if(node.tool.properties.hasOwnProperty("cost"))
        badge_row.append("span").attr("class","chip").text(node.tool.properties.cost);

    // Tool desc
    information.append("p").text(node.tool.properties.description);
    // Tool footer
    information.append("p").attr("class","modal-footer")
        .text("Upload date: " + node.tool.properties.additionDate + ", last update date: " + node.tool.properties.lastUpdate);
    // information.append("p").style("white-space", "pre-wrap").text(JSON.stringify(node, null, '\t'));
}

let modal = document.getElementById("modal_generated");

let span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

export {generate_modal_for_tool};