import ReactFlow, { MarkerType, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

export default function ReactFlowCanva() {

  const onClick = () => {
    return(
        console.log('test')
      );
    
  }


  const edges = [
    {
      id: '1-2',
      source: '1',
      target: '2',
      type: 'custom',
      label: 'step brother',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
    {
      id: '2-3',
      source: '2',
      target: '3',
      type: 'step',
      label: 'Méditéranée',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }
  ];

  const nodes = [
    {
      id: "3",
      type: "app",
      data: {
        label: "Find Item",
        name: "monday.com",
      },
      position: { x: 0, y: 0 }
    }]

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={onClick} elementsSelectable>
      <Background />
      <Controls />
    </ReactFlow>
  )
}
