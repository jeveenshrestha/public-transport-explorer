import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

import './App.css';

import Stops from './components/stops/Stops';
import Filter from './components/filter/Filter';
import Search from './components/Search';
import Map from './components/map/Map';

import { Station } from './types/station';
import { Mode } from './types/vehicleMode';
import { useFetchStations } from './hooks/useFetchStations';
import { useFetchStops } from './hooks/useFetchStops';
import styles from './styles/App.module.css';

const DEFAULT_LOCATION = { lat: 60.1695, lon: 24.9354 }; // Helsinki city center
const DEFAULT_RADIUS = 500;

const App: React.FC = () => {
  const {
    stationData,
    setStationData,
    selectedModes,
    loadingStation,
    fetchStationsByLocation,
    fetchStations,
    setSelectedModes,
  } = useFetchStations();

  const { fetchStops, stopsData, startPolling, stopPolling } = useFetchStops();

  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setSelectedStation(null);
      stopPolling();
      setStationData([]); // Clear old stations
      fetchStations({ variables: { query } });
    },
    [fetchStations, stopPolling, setStationData]
  );

  // Handle station click on the map
  const handleStationClick = useCallback(
    (stationId: string) => {
      setSelectedStation(stationId);
      fetchStops({ variables: { stationId } });
      startPolling(2000);
    },
    [fetchStops, startPolling]
  );

  // Handle filter selection
  const handleFilterChange = useCallback(
    (modes: Mode[]) => {
      setSelectedModes(modes);
    },
    [setSelectedModes]
  );

  // Handle clearing the search input
  const handleClearInputField = useCallback(() => {
    setSelectedModes([]);
    setSearchQuery('');
    setSelectedStation(null);
    stopPolling();
    fetchStationsByLocation({
      variables: { ...userLocation, radius: DEFAULT_RADIUS },
    });
  }, [fetchStationsByLocation, stopPolling, userLocation, setSelectedModes]);

  // Fetch user location when the app loads
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(newLocation);
          fetchStationsByLocation({
            variables: {
              ...newLocation,
              radius: DEFAULT_RADIUS,
            },
          });
        },
        () =>
          fetchStationsByLocation({
            variables: { ...DEFAULT_LOCATION, radius: DEFAULT_RADIUS },
          }) // using default location
      );
    } else {
      fetchStationsByLocation({
        variables: { ...DEFAULT_LOCATION, radius: DEFAULT_RADIUS },
      });
    }
  }, [fetchStationsByLocation]);

  useEffect(() => {
    setSelectedStation(null);
  }, [searchQuery]);

  const filteredStations = useMemo(
    () =>
      stationData?.filter(
        (station: Station) =>
          selectedModes && selectedModes.includes(station.vehicleMode)
      ) || [],
    [stationData, selectedModes]
  );

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">HSL Public Transport Explorer</h3>
      <div>
        <Search
          onSearch={handleSearch}
          onSelect={handleSearch}
          onClear={handleClearInputField}
        />
      </div>
      <div>
        <div className={styles.filterContainer}>
          <Filter onFilterChange={handleFilterChange} modes={selectedModes} />
        </div>
        <div>
          {loadingStation ? (
            <Spinner animation="border" />
          ) : (
            <Map
              stations={filteredStations}
              onStationClick={handleStationClick}
            />
          )}
        </div>
      </div>
      {stopsData?.station && selectedStation && (
        <Stops stop={stopsData?.station} />
      )}
    </Container>
  );
};

export default App;
