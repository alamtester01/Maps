import L from 'leaflet';
import iconUrl from '../flag.png'; // Adjust the path as needed

const customMarkerIcon = L.icon({
  iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default customMarkerIcon;
