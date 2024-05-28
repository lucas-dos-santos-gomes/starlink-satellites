import axios from 'axios';
import { useEffect, useState } from 'react';
import List from './style';

export default function StarlinkList() {
  const [starlinks, setStarlinks] = useState([]);

  useEffect(() => {
    axios.post('https://api.spacexdata.com/v4/starlink/query', {
      "query": {},
      "options": { limit: 100 }
    }).then(res => setStarlinks(res.data.docs)).catch(err => {
      alert('Houve um erro na requisição');
      console.log(err);
    });
  }, []);

  return (
    <List>
      <h1>Satélites da Starlink</h1>
      <ul>
        {starlinks.length === 0 ? (<p>Carregando satélites...</p>) : (<ul>
          {starlinks.map(satellite => (
            <li key={satellite.id}>{satellite.spaceTrack.OBJECT_NAME}</li>
          ))}
        </ul>)}
      </ul>
    </List>
  );
}