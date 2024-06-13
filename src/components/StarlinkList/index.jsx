import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Button from '../Button';
import 'leaflet/dist/leaflet.css';
import { List } from './style';

const satIcon = new L.Icon({
  iconUrl: 'black-satellite.png',
  iconSize: [25,25],
  iconAnchor: [12,12],
  popupAnchor: [0, -12]
});

export default function StarlinkList() {
  const [starlinks, setStarlinks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [total, setTotal] = useState(0);
  const start = useRef(true);

  const fetchStarlinks = (page, more) => {
    axios.post('https://api.spacexdata.com/v4/starlink/query', {
      "query": {},
      "options": { page: page, limit: 100 }
    }).then(res => {
      setStarlinks(nowDocs => more ? [...nowDocs, ...res.data.docs] : nowDocs.length >= 200 ? [...nowDocs].splice(0, nowDocs.length - 100) : []);
      setHasNextPage(res.data.hasNextPage);
      setHasPrevPage(res.data.hasPrevPage);
      setTotal(res.data.totalDocs);
    }).catch(err => {
      alert('Houve um erro de requisição de dados.');
      console.log(err);
    });
  }

  const loadMore = () => {
    if(hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchStarlinks(nextPage, true);
    }
  };

  const loadLess = () => {
    if(hasPrevPage) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchStarlinks(prevPage, false);
    }
  }

  useEffect(() => {
    if(start.current) {
      fetchStarlinks(1, true);
      start.current = false;
    }
  }, []);

  useEffect(() => console.log(starlinks), [starlinks])

  return (
    <List>
      <h1>Satélites da Starlink</h1>
      <MapContainer center={[0,0]} zoom={2} style={{ height: '65vh', width:'80vw' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {starlinks.filter((sat) => sat.latitude !== null && sat.longitude !== null).map((sat) => (
          <Marker key={sat.id} position={[sat.latitude, sat.longitude]} icon={satIcon}>
            <Popup>
              <div>
                <h2>{sat.spaceTrack.OBJECT_NAME}</h2>
                <p>Latitude: {sat.latitude}</p>
                <p>Longitude: {sat.longitude}</p>
                <p>Velocidade: {sat.velocity_kms}</p>
                <p>Altura: {sat.height_km}</p>
                <p>Data de lançamento: {sat.spaceTrack.LAUNCH_DATE}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{textAlign: 'center', margin:'20px 0'}}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {hasPrevPage && (
            <div style={{width: '180px', display: 'flex', justifyContent: 'center'}}>
              <Button onClick={loadLess} more={false}>Carregar menos</Button>
            </div>
          )}
          {hasNextPage && (
            <div style={{width: '180px', display: 'flex', justifyContent: 'center'}}>
              <Button onClick={loadMore} more>Carregar mais</Button>
            </div>
          )}
        </div>
        <p>{starlinks.length} satélites carregados de um total de {total}</p>
      </div>
    </List>
  );
}