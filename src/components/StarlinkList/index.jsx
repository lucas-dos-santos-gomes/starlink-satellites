import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { List } from './style';

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
      <MapContainer center={[0,0]} zoom={2} style={{ height: '70vh', width:'80vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {starlinks
          .filter((sat) => sat.latitude !== null && sat.longitude !==null)
          .map((sat) => (
            <Marker key={sat.id} position={[sat.latitude, sat.longitude]}>
              <Popup>
                {sat.spaceTrack.OBJECT_NAME}
              </Popup>
            </Marker>
        ))}
    </MapContainer>
    </List>
  );
}