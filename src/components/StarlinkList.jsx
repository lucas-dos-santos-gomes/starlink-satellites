import axios from "axios";
import { useEffect, useState } from "react";

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
    <>
      <h1>Satélites da Starlink</h1>
      {starlinks.length === 0 ? (<p>Carregando satélites...</p>) : starlinks.map(satellite => (
        <li key={satellite.id}>{satellite.spaceTrack.OBJECT_NAME}</li>
      ))}
    </>
  );
}