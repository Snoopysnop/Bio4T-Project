import React from 'react';

interface BoxType {
    description:any,
    position:any,
    id:any
}

const Box = (param:BoxType) => {
  let id = "myModal" + String(param.id)
  let is_list = document.querySelector('.list')
  let tops = '150px'
  if(is_list){
    console.log("true")
    let topn = 150 + parseInt(param.id.slice(4))*330;
    tops = topn.toString() + 'px'
  }
  let tool_name = param.description.split("\n")[0]
  let description = param.description.split("\n")[1]
  let topics = param.description.split("\n")[2]
  let inputs = param.description.split("\n")[3]
  let outputs = param.description.split("\n")[4]
  let link = param.description.split("\n")[5]

  console.log(inputs)

  let input_list:any = []
  inputs.split("/").forEach((el:any) => {
    input_list.push( <p className='item_list'>{el}</p>)
  });

  let output_list:any = []
  outputs.split("/").forEach((el:any) => {
    output_list.push( <p className='item_list'>{el}</p>)
  });

  let topic_list:any = []
  topics.split("/").forEach((el:any) => {
    topic_list.push( <p className='item_list'>{el}</p>)
  });
  return (
    <div id={id} style={{
      // position: 'absolute',
      zIndex:10,
      // top: "50vh",
      // left: "50vw",
      backgroundColor: 'white',
      borderRadius: 5,
      maxHeight: '300px',
      width: "390px",
      margin:"auto",
      position: 'absolute',
      left: '615px',
      top: tops,
      overflow:'scroll'
    }}>
      <div className='inner'>
        <a href={link} target='_blank'><b>{tool_name}</b></a>
        <p>{description}</p>
        <b>Inputs</b>
        <div style={{display:'flex', overflow:'scroll'}}>{input_list}</div>
        <br />
        <b>Outputs</b>
        <div style={{display:'flex', overflow:'scroll'}}>{output_list}</div>
        <br />
        <b>Topics</b>
        <div style={{display:'flex', overflow:'scroll'}}>{topic_list}</div>
        </div>
    </div>
  );
};

export default Box;