import React, { useState } from 'react';
import axios from 'axios';

const CitySearch = ({ onCitySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert('Please enter a city/province to search');
      return;
    }

    // Call geocoding API to search for cities/provinces
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchQuery)}&key=c59658f3cb2341e692d711e5c3d3dbf0`)
      .then(response => {
        setSearchResults(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleCitySelect = (selectedCity) => {
    const { lat, lng } = selectedCity.geometry;
    const selectedCityData = {
      name: selectedCity.formatted,
      population: '', // Assuming population is not available during search
      lat: lat,
      lng: lng,
    };
    onCitySelect(selectedCityData);
    // Clear search query and results after selection
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div>
      <h2>Search City/Province</h2>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter city/province name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <ul>
        {searchResults.map(result => (
          <li key={result.annotations.geohash} onClick={() => handleCitySelect(result)}>
            {result.formatted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch;
