import { useCallback, useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { useFetchStations } from '../../hooks/useFetchStations';
import { useFetchStops } from '../../hooks/useFetchStops';
import Filter from '../../components/filter/Filter';
import Search from '../../components/search/Search';
import Stops from '../../components/stops/Stops';
import Map from '../../components/map/Map';
import { Station } from '../../types/station';
import { Mode } from '../../types/vehicleMode';

import styles from './Home.module.css';
import { DEFAULT_LOCATION, DEFAULT_RADIUS, POLLINGINTERVAL } from '../../utils/constants';



const Home: React.FC = () => {
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
      startPolling(POLLINGINTERVAL);
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
    <>
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
    </>
  );
};

export default Home;
