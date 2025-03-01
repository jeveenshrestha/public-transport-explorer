import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import './App.css';

import Stops from './components/stops/Stops';
import Filter from './components/Filter';
import Search from './components/Search';
import Map from './components/Map';

import { Station } from './types/station';
import { Mode } from './types/vehicleMode';
import { useFetchStations } from './hooks/useFetchStations';
import { useFetchStops } from './hooks/useFetchStops';

const DEFAULT_LOCATION = { lat: 60.1695, lon: 24.9354 }; // Helsinki city center

const App: React.FC = () => {
  const {
    stationData,
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedStation(null);
    stopPolling();
    fetchStations({ variables: { query } });
  };

  const handleSelectStation = (query: string) => {
    setSearchQuery(query);
    stopPolling();
    fetchStations({ variables: { query } });
  };

  const handleStationClick = (stationId: string) => {
    setSelectedStation(stationId);
    fetchStops({ variables: { stationId } });
    startPolling(2000);
  };

  const handleFilterChange = (modes: Mode[]) => {
    setSelectedModes(modes);
  };

  const handleClearInputField = () => {
    setSelectedModes([]);
    setSearchQuery('');
    setSelectedStation(null);
    stopPolling();
    fetchStationsByLocation({ variables: { ...userLocation, radius: 500 } });
  };

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
              radius: 500,
            },
          });
        },
        () => {
          fetchStationsByLocation({
            variables: { ...DEFAULT_LOCATION, radius: 500 },
          }); // using default location
        }
      );
    } else {
      fetchStationsByLocation({
        variables: { ...DEFAULT_LOCATION, radius: 500 },
      });
    }
  }, [fetchStationsByLocation]);

  useEffect(() => {
    setSelectedStation(null);
  }, [searchQuery]);

  const filteredStations =
    stationData?.filter(
      (station: Station) =>
        selectedModes && selectedModes.includes(station.vehicleMode)
    ) || [];

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">HSL Public Transport Explorer</h3>
      <Row>
        <Col>
          <Search
            onSearch={handleSearch}
            onSelect={handleSelectStation}
            onClear={handleClearInputField}
          />
        </Col>
      </Row>
      <Row>
        <Col md={1} xs={1}>
          <Filter onFilterChange={handleFilterChange} modes={selectedModes} />
        </Col>
        <Col md={11} xs={11}>
          {loadingStation ? (
            <Spinner animation="border" />
          ) : (
            <Map
              stations={filteredStations}
              onStationClick={handleStationClick}
            />
          )}
        </Col>
      </Row>
      {stopsData?.station && selectedStation && (
        <Stops stop={stopsData?.station} />
      )}
    </Container>
  );
};

export default App;
