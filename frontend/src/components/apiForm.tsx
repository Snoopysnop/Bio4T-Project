import axios from "axios";

async function autocompletion(input:string, output:string, label:string, depth:number, limit:number) {
    const jsonInput = '{"input":"'+input+'", "output":"'+output+'", "label":"'+label+'", "depth":"'+depth+'", "limit":"'+limit+'"}'
    const json = JSON.parse(jsonInput)
    return await axios.post('http://localhost:5000/sendForm', {json})
    .then(response => JSON.stringify(response.data));
}

export default autocompletion;