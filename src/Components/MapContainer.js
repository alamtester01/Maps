import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import customMarkerIcon from './CustomMarker';

const MapContainer = ({ cities, center }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView(center, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    cities.forEach(city => {
      const popupContent = `<div><b>${city.name}</b><br>Population: ${city.population}</div>`;
      
      L.marker([city.lat, city.lng], { icon: customMarkerIcon })
        .addTo(map)
        .bindPopup(popupContent)
        .on('mouseover', function (e) {
          this.openPopup();
        })
        .on('mouseout', function (e) {
          this.closePopup();
        });
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [cities, center]);

  return <div id="map" className="map-container" ref={mapRef}></div>;
};

export default MapContainer;
