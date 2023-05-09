import React from 'react';
import { useState } from 'react';
import ReactFlow, {
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Box from './Box';

let last_clicked:string = "none"

interface ParamType {
    nodes:any,
    edges:any,
    id:any
}

export default function MyFlowComponent(param:ParamType) {

    //Background color
    const rfStyle = {
        backgroundColor: '#FFFFFF',

    };

    const [boxVisible, setBoxVisible] = useState(false);
    const [boxDescription, setBoxDescription] = useState('');

    const changeVisibility = (event : any, node: Node ) => {
        if(last_clicked === node.id){
            setBoxVisible(false);
            last_clicked = "none"
        }
        else {
            setBoxVisible(true);
            last_clicked = node.id
        }
        toggleBox(event, node)

    }

    const visible = (event : any, node: Node ) => {
        setBoxVisible(true);
        toggleBox(event, node)
    }
    const invisible = (event : any, node: Node ) => {
        setBoxVisible(false);
        toggleBox(event, node)
    }
    const toggleBox = (event : any, node: Node ) => {
        setBoxDescription(node.data.description);
    };

    let exportID = "exp" + param.id
    let ratingID = "rat" + param.id
    let executeID = "exe" + param.id

    //variant = lines cross or dots
    return (
    <div className='flow reactflowCanva' id={param.id}>
      <ReactFlow
        nodes={param.nodes}
        edges={param.edges}
        style={rfStyle}
        draggable={false}
        onNodeClick={changeVisibility}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnPinch={false}
      >
      </ReactFlow>
      <div className='flowButton'>
        <button className='export' id={exportID}></button>
        <button className='rating' id={ratingID}></button>
        <button className='execute' id={executeID}></button>
      </div>
        {boxVisible && <Box id={param.id} description={boxDescription} />}
    </div>
  );
};
