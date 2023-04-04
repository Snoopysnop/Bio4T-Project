import axios from "axios";

async function autocompletion(output:string) {
    const jsonOutput = '{"output":"'+output+'"}'
    const json = JSON.parse(jsonOutput)
    return await axios.post('http://localhost:5000/getOutputs', {json})
    .then(response => JSON.stringify(response.data));
}

export default autocompletion;