import React, { useState } from 'react';
import axios from 'axios';

const CityForm = ({ onAddCity }) => {
  const [name, setName] = useState('');
  const [population, setPopulation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setName(cityName);

    // Call geocoding API to get coordinates for the city
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=c59658f3cb2341e692d711e5c3d3dbf0`)
      .then(response => {
        const { lat, lng } = response.data.results[0].geometry;
        setLat(lat);
        setLng(lng);
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !population || !lat || !lng) {
      alert('Please fill in all fields');
      return;
    }
    const newCity = {
      name: name,
      population: parseInt(population), // Converts population to integer
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    onAddCity(newCity);
    setName('');
    setPopulation('');
    setLat('');
    setLng('');
  };

  return (
    <div>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleCityChange}
          />
        </div>
        <div>
          <label>Population:</label>
          <input
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
          />
        </div>
        {/* Hidden input fields for Lat/Lng */}
        <input
          type="hidden"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="hidden"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

export default CityForm;
