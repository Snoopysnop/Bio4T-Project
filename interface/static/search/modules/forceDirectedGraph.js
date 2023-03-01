import {generate_modal_for_tool} from "./popup.js";
import {string_to_colour} from "./utils.js";

class Vector2
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
    plus(vec)
    {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }
    minus(vec)
    {
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }
    mul(scalar)
    {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

class Node
{
    constructor(x, y, node_name, id, id_function, input_list, output_list, tool)
    {
        this.tool = tool;
        this.node_name = node_name;
        this.id = id;
        this.id_function = id_function;
        this.input_list = input_list;
        this.output_list = output_list;
        this.pos = new Vector2(x, y);
        this.force = new Vector2(0.0, 0.0);
        this.start_dragging = false;
        this.is_dragging = false;
    }
    add_circle(parent)
    {
        this.parent = parent;
        this.parent.attr("transform", "translate(" + this.pos.x + ","  + this.pos.y + ")");
        this.circle = this.parent
            .append("circle")
            .attr('r', 50)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", string_to_colour(this.node_name))
            .on("mouseover", () => {this.circle.attr('r', 52);})
            .on("mouseout", () => {this.circle.attr('r', 50);})
            .on("mousedown", () => {this.start_dragging = true; d3.select(this.parent).raise();}) //TODO Mettre ce cercle au sommet du svg
            .on("mouseup", () => {
                this.start_dragging = false;
                if (!this.is_dragging) generate_modal_for_tool(this.tool);
                this.is_dragging = false;
            })
            .on("mousemove", () => {
                if (this.start_dragging)
                {
                    d3.event.preventDefault(); // bloque le comportement par défaut du maintiens de la souris (selection de texte)
                    this.is_dragging = true;
                    // cooling_factor = 100.0; // On "rallume" la simulation pour que les simulation se comporte correctement
                    // ¿?¿ fonctionne en partant du principe que le graph est le svg le plus haut du document
                    let svg = document.querySelector('svg');
                    let rect  = svg.getBoundingClientRect(); // On choppe les dimensions du svg
                    // type qui permet la transposition du système de coordonnée de la fenêtre vers celui du svg
                    let pt = svg.createSVGPoint();
                    pt.x = d3.event.clientX;
                    pt.y = d3.event.clientY;
                    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
                    if (pt.x < 0 || pt.y < 0 || pt.x > rect.width || pt.y > rect.height) {
                        this.start_dragging = false;
                        this.is_dragging = false;
                    }
                    else
                    {
                        this.pos = new Vector2(pt.x, pt.y);
                        this.parent.attr("transform", "translate(" + this.pos.x + ","  + this.pos.y + ")");
                    }
                }
            });
    }
    add_text()
    {
        this.parent.append("foreignObject")
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
            .text(this.node_name);
    }
    move(delta)
    {
        let width = document.body.clientWidth;
        let height = 600;
        this.pos = this.pos.plus(delta);
        if (this.pos.x < 50) this.pos.x = 50;
        if (this.pos.y < 50) this.pos.y = 50;
        if (this.pos.x > width - 50) this.pos.x = width - 50;
        if (this.pos.y > height - 50) this.pos.y = height - 50;
        this.parent.attr("transform", "translate(" + this.pos.x + ","  + this.pos.y + ")");
    }
}

class Edge
{
    constructor(node1, node2, canvas)
    {
        this.node1 = node1;
        this.node2 = node2;
        this.canvas = canvas;
    }
    add_line()
    {
        this.line = this.canvas
            .append("line")
            .attr("x1", this.node1.pos.x)
            .attr("x2", this.node2.pos.x)
            .attr("y1", this.node1.pos.y)
            .attr("y2", this.node2.pos.y)
            .attr("stroke", "#2b2b2b")
            .style("stroke-width", 7);
    }
    update()
    {
        this.line
            .attr("x1", this.node1.pos.x)
            .attr("x2", this.node2.pos.x)
            .attr("y1", this.node1.pos.y)
            .attr("y2", this.node2.pos.y);
    }
}

class Graph
{
    constructor(data)
    {
        this.cooling_factor = 100.0;

        this.cooling_decay = 0.1;
        this.force_mul = 1.0;
        this.repulsion = 16000.0;
        this.spring_strength = 2.0; // impact très (trop) élevé ???
        this.ideal_spring_length = 200.0;

        this.iteration_per_second = 165.0;

        this.width = document.body.clientWidth;
        this.height = 600;
        this.nodes = [];
        this.edges = [];

        this.graph_canvas = d3.select('#generated_graph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        for (let i = 0; i < data.nodes.length; ++i)
        {
            let node_name = data.nodes[i].tool.properties.name;
            let node_id = data.nodes[i].tool.id;
            let node_id_function = data.nodes[i].function.id;
            let node_inputs = data.nodes[i].inputList;
            let node_outputs = data.nodes[i].outputList;
            let node_info = data.nodes[i];
            let node = new Node(this.width/2 + (Math.random() * this.width - this.width/2),
                                this.height/2 + (Math.random() * this.height - this.height/2),
                                node_name, node_id, node_id_function, node_inputs, node_outputs, node_info);
            this.nodes.push(node);
        }

        // Il faut dessiner les arrêtes avant les cercles car on ne peut pas spécifier le z-order :o)
        for (let i = 0; i < data.links.length; i++)
        {
            let node1 = this.get_node_by_id(data.links[i].source);
            let node2 = this.get_node_by_id(data.links[i].target);
            if (node1 === undefined || node2 === undefined) continue;
            let edge = new Edge(node1, node2, this.graph_canvas);
            edge.add_line();
            this.edges.push(edge);
        }

        this.nodes.forEach(node => {let elem = this.graph_canvas.append("g"); node.add_circle(elem); node.add_text();});

        setInterval(() => this.update(), 1/this.iteration_per_second * 1000);
    }

    update()
    {

        // if (this.cooling_factor <= 0) return;

        for (let i = 0; i < this.nodes.length; ++i)
        {
            this.nodes[i].force = new Vector2(0, 0);
            for (let j = 0; j < this.nodes.length; ++j)
            {
                if (i === j) continue;
                let distance = this.nodes[i].pos.minus(this.nodes[j].pos).magnitude();
                if (distance >= this.ideal_spring_length * 1.1) continue;
                let displacement_vector = this.nodes[i].pos.minus(this.nodes[j].pos).mul(this.repulsion / (distance * distance));
                this.nodes[i].force = this.nodes[i].force.plus(displacement_vector);
            }
        }

        for (let i = 0; i < this.edges.length; ++i)
        {
            let node1 = this.edges[i].node1;
            let node2 = this.edges[i].node2;
            if(node1.node_name === node2.node_name) continue; // si un noeuds est malencontreusement relié à lui-même
            let force = this.spring_strength * Math.log(node2.pos.minus(node1.pos).magnitude() / this.ideal_spring_length);
            node1.force = node1.force.plus(node2.pos.minus(node1.pos).mul(force));
            node2.force = node2.force.plus(node1.pos.minus(node2.pos).mul(force));
            // negation of the repulsing force
            let distance = node1.pos.minus(node2.pos).magnitude();
            node1.force = node1.force.minus(node1.pos.minus(node2.pos).mul(this.repulsion / (distance * distance)));
            node2.force = node2.force.minus(node2.pos.minus(node1.pos).mul(this.repulsion / (distance * distance)));
        }

        this.nodes.forEach(node => {
            if (node.force.magnitude() > 35 && !node.is_dragging) // Pour éviter (un peu) les tremblements
                node.move(node.force.mul(this.force_mul).mul(1/this.iteration_per_second));
        });
        this.edges.forEach(edge => edge.update());

        this.cooling_factor -= this.cooling_decay;
        if (this.cooling_factor < 0) this.cooling_factor = 0;
    }

    get_node_by_id(id)
    {
        for (let i = 0; i < this.nodes.length; ++i)
        {
            if (this.nodes[i].id_function === id) return this.nodes[i];
            for(let j = 0; j < this.nodes[i].input_list.length; ++j)
            {
                if (this.nodes[i].input_list[j].node.id === id) return this.nodes[i];
                if (this.nodes[i].input_list[j].relation.id === id) return this.nodes[i];
            }
            for(let j = 0; j < this.nodes[i].output_list.length; ++j)
            {
                if (this.nodes[i].output_list[j].node.id === id) return this.nodes[i];
                if (this.nodes[i].output_list[j].relation.id === id) return this.nodes[i];
            }
        }
    }
}

export {Graph};