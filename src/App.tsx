import { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import './App.css';

import Stops from './components/stops/Stops';
import Filter from './components/Filter';
import Search from './components/Search';
import Map from './components/Map';

import { NearestStation, Station } from './types/station';
import { Mode } from './types/vehicleMode';

const DEFAULT_LOCATION = { lat: 60.1695, lon: 24.9354 }; // Helsinki city center

const GET_STATIONS_BY_LOCATION = gql`
  query GetNearestStations($lat: Float!, $lon: Float!, $radius: Int!) {
    nearest(
      lat: $lat
      lon: $lon
      maxDistance: $radius
      filterByPlaceTypes: [STATION]
    ) {
      edges {
        node {
          place {
            ... on Stop {
              gtfsId
              name
              lat
              lon
              vehicleMode
            }
          }
        }
      }
    }
  }
`;

const GET_STATIONS = gql`
  query GetStations($query: String!) {
    stations(name: $query) {
      gtfsId
      name
      lat
      lon
      vehicleMode
    }
  }
`;

const GET_STOPS_IN_STATION = gql`
  query GetStopsInStation($stationId: String!) {
    station(id: $stationId) {
      gtfsId
      name
      vehicleMode
      stoptimesWithoutPatterns(numberOfDepartures: 50) {
        stop {
          platformCode
        }
        serviceDay
        scheduledArrival
        scheduledDeparture
        trip {
          route {
            gtfsId
            shortName
            longName
            mode
          }
        }
        headsign
      }
    }
  }
`;

const App: React.FC = () => {
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [selectedModes, setSelectedModes] = useState<Mode[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stationData, setStationData] = useState<Station[]>([]);

  const [fetchStationsByLocation, { loading: loadingStation }] = useLazyQuery(
    GET_STATIONS_BY_LOCATION,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        if (data?.nearest?.edges) {
          const stations =
            data?.nearest?.edges
              .map((edge: NearestStation) => edge.node.place)
              .filter((station: Station) => station.vehicleMode !== null) || [];
          const modes = Array.from(
            new Set(stations.map((station: Station) => station.vehicleMode))
          ) as Mode[];
          setStationData(stations);
          setSelectedModes(modes);
        }
      },
    }
  );

  const [fetchStops, { data: stopsData, startPolling, stopPolling }] =
    useLazyQuery(GET_STOPS_IN_STATION);

  const [fetchStations, { loading }] = useLazyQuery(GET_STATIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.stations) {
        const stations =
          data?.stations.filter(
            (station: Station) => station.vehicleMode !== null
          ) || [];
        setStationData(stations);
        const modes = Array.from(
          new Set(data?.stations.map((station: Station) => station.vehicleMode))
        ) as Mode[];
        setStationData(stations);
        setSelectedModes(modes);
      }
    },
  });

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
          {loading || loadingStation ? (
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
