import React from 'react';
import MyFlowComponent from './MyFlowComponent';
import { getWorflow } from '../nodes_edges';
// import {workflow_nodes, workflow_edges} from '../nodes_edges'

let workflow_idx:number = 0;
let workflow_nodes:any;
let workflow_edges:any;

function changeWorkflow(element:any){
    let id:any = element.target.id
    if(id === "plus" && (workflow_idx+1)<workflow_nodes.length){
        workflow_idx++;
        document.getElementById("flow"+String(workflow_idx))!.scrollIntoView({ behavior: "smooth"})
    }
    else if(id === "minus" && (workflow_idx-1)>=0){
        workflow_idx--;
        document.getElementById("flow"+String(workflow_idx))!.scrollIntoView({ behavior: "smooth"})
    }
    document.getElementById("wfCount")!.innerText = (workflow_idx+1) + "/" + workflow_nodes.length
  }

const WorkflowCarousel = (param:any) => {
    let res = getWorflow(param.json)
    workflow_nodes = res.workflow_nodes
    workflow_edges = res.workflow_edges
    workflow_idx = 0
    let flowList:any = []
    workflow_nodes.forEach((nodes:any, idx:number)=>{
        let id:string = "flow"+String(idx);
        flowList.push( <MyFlowComponent key={id} id={id} nodes={nodes} edges={workflow_edges[idx]}/> )
    })
    
    return(
        <div className='full'>
            <div className='flexCarousel'>
                <button id="minus" className="btn btn-secondary btnfont" onClick={changeWorkflow}> ← </button>
                <div id='workflow_container'>
                    {flowList}
                </div>
                <button id="plus" className="btn btn-secondary btnfont" onClick={changeWorkflow}> → </button>
            </div>
            <p id='wfCount'>{(workflow_idx+1)}/{flowList.length}</p>
        </div>
    )
};

export default WorkflowCarousel;

//  <MyFlowComponent nodes={nodes} edges={workflow_edges[idx]}/>