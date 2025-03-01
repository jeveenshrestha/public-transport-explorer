import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { modeIcons } from '../utils/modeIcons';
import { Station } from '../types/station';

const SEARCH_STATIONS = gql`
  query SearchStations($query: String!) {
    stations(name: $query) {
      id
      name
      vehicleMode
    }
  }
`;

const Search: React.FC<{
  onSearch: (query: string) => void;
  onSelect: (stationId: string) => void;
  onClear: () => void;
}> = ({ onSearch, onSelect, onClear }) => {
  const [stationsData, setStationsData] = useState<Station[]>([]);
  const [search, setSearch] = useState('');
  const [fetchStations] = useLazyQuery(SEARCH_STATIONS, {
    onCompleted: (data) => {
      setStationsData(
        data.stations.filter((station: Station) => station.vehicleMode !== null)
      );
    },
  });
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    if (query.length > 1) {
      fetchStations({ variables: { query } });
    }
    setShowSuggestion(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(search);
      setShowSuggestion(false);
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    onClear();
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for stations..."
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {search.length > 1 && (
          <Button variant="outline-secondary" onClick={handleClearSearch}>
            X
          </Button>
        )}
        <Button
          variant="outline-secondary"
          onClick={() => {
            onSearch(search);
            setShowSuggestion(false);
          }}
        >
          Search
        </Button>
      </InputGroup>

      {stationsData.length > 0 && showSuggestion && (
        <ListGroup>
          {stationsData.map((station: Station) => (
            <ListGroup.Item
              key={station.gtfsId}
              action
              onClick={() => {
                setSearch(station.name);
                onSelect(station.name);
                setShowSuggestion(false); // Hide suggestions
              }}
            >
              <div className="d-flex justify-content-start gap-3">
                <img
                  width={25}
                  src={modeIcons[station.vehicleMode].active || ''}
                />
                {station.name}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Search;
