import axios from "axios";

async function apiTest() {
    const a = '{"input":"caca", "output":"caca", "limit":"caca", "depth":"caca"}'
    const json = JSON.parse(a)
    console.log(json);

    axios.post('http://localhost:5000/workflow-get', {json})
    .then(response => console.log("lalalala "+response.data));
    
  }

export default apiTest;