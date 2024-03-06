import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ lat, lng }) => {
  useEffect(() => {
    const map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);

    return () => {
      map.remove(); // Dispose of the map when the component unmounts
    };
  }, [lat, lng]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default Map;
