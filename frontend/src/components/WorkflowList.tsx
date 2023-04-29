import React from 'react';
import MyFlowComponent from './MyFlowComponent';
import { getWorflow } from '../nodes_edges';
// import {workflow_nodes, workflow_edges} from '../nodes_edges'

const WorkflowList  = (param:any) => {
    let res = getWorflow(param.json)
    let workflow_nodes = res.workflow_nodes
    let workflow_edges = res.workflow_edges
    let flowList:any = []
    workflow_nodes.forEach((nodes:any, idx:number)=>{
        let id:string = "flow"+String(idx);
        flowList.push( <MyFlowComponent key={id} id={id} nodes={nodes} edges={workflow_edges[idx]}/> )
    })
    
    return(
        <div className='list'>
            <div id='workflow_container'>
                {flowList}
            </div>
        </div>
    )
};

export default WorkflowList;

//  <MyFlowComponent nodes={nodes} edges={workflow_edges[idx]}/>