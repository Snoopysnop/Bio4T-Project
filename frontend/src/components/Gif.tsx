import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Gif() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios
      .get(`https://api.giphy.com/v1/gifs/search?api_key=ZRrqIMkwny7L8G0cER1nSGjS1wV3nyDk&q=meme&limit=100&offset=0&rating=g&lang=en`)
      .then(response => {
        setImageUrl(response.data.data[Math.floor(Math.random() * 100)].images.fixed_height_small.url);
        })
      .catch(error => console.log(error));
  }, []);

  return <img src={imageUrl} alt="random gif" />;
}

export default Gif;