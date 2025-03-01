import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapProps, modeIcons } from '../types/map';

const Map: React.FC<MapProps> = ({ stations, onStationClick }) => {
  return (
    <MapContainer
      center={[
        stations.length !== 0 ? stations[0].lat : 60.1695,
        stations.length !== 0 ? stations[0].lon : 24.9354,
      ]}
      zoom={10}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {stations.map((station) => {
        const position: [number, number] =
          station.lat && station.lon
            ? [station.lat, station.lon]
            : [60.1695, 249354];
        return (
          <Marker
            key={station?.gtfsId.concat(station.lat.toString())}
            position={position}
            icon={modeIcons[station.vehicleMode] || modeIcons['BUS']}
            eventHandlers={{ click: () => onStationClick(station.gtfsId) }}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
