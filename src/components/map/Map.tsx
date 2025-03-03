import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { MapProps, modeIcons } from '../../types/map';
import { Station } from '../../types/station';
import 'leaflet/dist/leaflet.css';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../utils/constants';



// Helper component to recenter the map
const RecenterMap: React.FC<{ stations: MapProps['stations'] }> = ({
  stations,
}) => {
  const map = useMap();

  useEffect(() => {
    if (stations.length > 0) {
      const [firstStation] = stations;
      if (firstStation?.lat && firstStation?.lon) {
        map.setView([firstStation.lat, firstStation.lon], DEFAULT_ZOOM);
      }
    }
  }, [stations, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ stations, onStationClick }) => {
  const stationMarkers = useMemo(
    () =>
      stations
        .filter(
          (station: Station) =>
            station.lat !== undefined && station.lon !== undefined
        )
        .map((station: Station) => {
          const position: [number, number] = [station.lat, station.lon];

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
        }),
    [stations, onStationClick]
  );
  return (
    <MapContainer
      center={
        stations[0]?.lat ? [stations[0].lat, stations[0].lon] : DEFAULT_CENTER
      }
      zoom={DEFAULT_ZOOM}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <RecenterMap stations={stations} />
      {stationMarkers}
    </MapContainer>
  );
};

export default Map;
