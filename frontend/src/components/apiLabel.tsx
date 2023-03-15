import axios from "axios";

async function autocompletion(input:string) {
    const jsonInput = '{"input":"'+input+'"}'
    const json = JSON.parse(jsonInput)
    console.log(json);
    return await axios.post('http://localhost:5000/getLabels', {json})
    .then(response => JSON.stringify(response.data));
}

export default autocompletion;