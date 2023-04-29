import {
    Node,
    Position,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import './nodes_edges.css';
// import workflow_json from './workflow.json';

interface Style {
    width: string,
    height: string,
};

interface PositionInterface {
    x: number,
    y: number,
};

interface Data {
    label: string,
    description: string,
};

interface Nodes extends Node {
    name: string;
    data: Data;
    type: string;
    position: PositionInterface;
    style: Style;
}

interface MarkerEnd {
    type: MarkerType,
}

interface Edge {
    id: string;
    source: string;
    target: string;
    type: string;
    style: Style;
    markerEnd: MarkerEnd;
    label: string;
}

// async function getWorflow(url:any){
function getWorflow(json:any){
    // let res = await fetch(url);
    // let workflow_json = await res.json();

    let workflow_json = JSON.parse(json);

    let workflow_nodes: Nodes[][] = [];
    let workflow_edges: Edge[][] = [];

    workflow_json.forEach((workflow:any,workflow_ind:number) => {
        console.log(workflow.workflows)
        let edges: Edge[] = [];
        let nodes: Nodes[] = [];

        workflow.workflows.forEach((element:any, ind: number) => {
            if (ind % 2 === 0) {
        
                let obj: Nodes = {
                    id: '',
                    name: '',
        
                    type: '',
                    style: {
                        width: '0',
                        height: '0',
                    },
        
                    position: {
                        x: 0,
                        y: 0,
                    },
        
                    data: {
                        label: '',
                        description: '',
                    },
                };
                obj.id = String(workflow_ind) + (1 + Math.floor((ind + 1) / 2));
                if (obj.id === '1') obj.type = 'input'
                else obj.targetPosition = Position.Left
                if (obj.id === String(workflow_json.length)) obj.type = 'output'
                obj.sourcePosition = Position.Right
                obj.name = element.name;
                obj.data.description = ''

                obj.data.description = element.name + "\n" + element.description + "\n"
                element.topics.forEach((topic: string) => { obj.data.description += topic + "/" })
                obj.data.description += "\n"
                element.input.forEach((input: string) => { obj.data.description += input + "/" })
                obj.data.description += "\n"
                element.output.forEach((output: string) => { obj.data.description += output + "/" })
                obj.data.description += "\n"+element.homepage

                obj.data.label = element.name
                obj.position.y = 0;
                obj.position.x = ind * 100;
                obj.style = {
                    width: '100',
                    height: '50',
                };
                nodes.push(obj)
            }
        });

        workflow.workflows.forEach((element:any, ind: number) => {
            if (ind % 2 === 1) {
                let obj: Edge = {
                    id: '',
                    source: '',
                    target: '',
                    type: '',
                    style: {
                        width: '0',
                        height: '0',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    label: '',
                };
                obj.id = String(workflow_ind) + Math.floor((ind + 1) / 2) + "-" + String(workflow_ind) + (Math.floor((ind + 1) / 2) + 1);
                obj.source = String(workflow_ind) + + Math.floor((ind + 1) / 2);
                obj.target = String(workflow_ind) + + (Math.floor((ind + 1) / 2) + 1);
                obj.type = 'custom';
                obj.label = element.score + "";
                obj.style = {
                    width: '150',
                    height: '50',
                };
                edges.push(obj)
            }
        });

        workflow_nodes.push(nodes)
        workflow_edges.push(edges)

    })
    console.log(JSON.stringify(workflow_nodes,null,4))
    console.log("\n edges \n")
    console.log(JSON.stringify(workflow_edges,null,4))

    return {workflow_nodes, workflow_edges}
}


export {getWorflow};