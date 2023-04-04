import axios from "axios";

async function autocompletion(label:string) {
    const jsonLabel = '{"label":"'+label+'"}'
    const json = JSON.parse(jsonLabel)
    return await axios.post('http://localhost:5000/getLabels', {json})
    .then(response => JSON.stringify(response.data));
}

export default autocompletion;