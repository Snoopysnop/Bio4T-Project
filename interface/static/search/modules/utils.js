import {interpolateRgb} from "https://cdn.skypack.dev/d3-interpolate@3";

function string_to_colour(str) {
    let sum_char_str = 0;
    for (let i = 0; i < str.length; i++) sum_char_str += str.charCodeAt(i);
    sum_char_str %= 100;
    return interpolateRgb("#e303fc", "#fc9003")(sum_char_str / 100.0);
}

function get_node_by_id_from_graph(id, nodes)
{
    for (let i = 0; i < nodes.length; ++i)
    {
        if (nodes[i].function.id === id) return nodes[i];
    }
}

export {string_to_colour, get_node_by_id_from_graph};