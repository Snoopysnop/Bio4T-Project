import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Joke() {
  const [joke, setJoke] = useState('');
  const config = {
    headers:{
      'X-Api-Key': 'dag26OGX4mn0nZmoWqjh1g==y1gLXRxudc4SDdHI'    }
  };
  
  useEffect(() => {
    axios
      .get(`https://api.api-ninjas.com/v1/dadjokes?limit=1`, config)
      .then(response => {
        console.log(response.data[0].joke);
        setJoke(response.data[0].joke);
        })
      .catch(error => console.log(error));
  }, []);

  return <p> {joke} </p>;
}

export default Joke;