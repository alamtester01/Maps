import React, { useState } from 'react';
import MapContainer from './Components/MapContainer';
import CityForm from './Components/CityForm';
import CitySearch from './Components/CitySearch';
import './App.css';

const App = () => {
  const [cities, setCities] = useState([]);
  const [mapCenter, setMapCenter] = useState([14.5995, 120.9842]); // Default center

  const addCity = (city) => {
    setCities([...cities, city]);
  };

  const updateMapCenter = (lat, lng) => {
    setMapCenter([lat, lng]);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>Election Population Map</h1>
        <CityForm onAddCity={addCity} />
        <CitySearch onCitySelect={(city) => {
          addCity(city); // Add the selected city to the map
          updateMapCenter(city.lat, city.lng); // Update map center
        }} />
      </div>
      <div className="map-container">
        <MapContainer cities={cities} center={mapCenter} />
      </div>
    </div>
  );
};

export default App;
