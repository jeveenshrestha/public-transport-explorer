import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';

import { useFetchStations } from '../../hooks/useFetchStations';
import { modeIcons } from '../../utils/modeIcons';
import { Station } from '../../types/station';

const Search: React.FC<{
  onSearch: (query: string) => void;
  onSelect: (stationId: string) => void;
  onClear: () => void;
}> = ({ onSearch, onSelect, onClear }) => {
  const { fetchStations, stationData } = useFetchStations();
  const [search, setSearch] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Debounce API calls to avoid unnecessary queries
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.length > 1) fetchStations({ variables: { query: search } });
    }, 300); // Wait for 300ms before triggering API call
    return () => clearTimeout(handler);
  }, [search, fetchStations]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch((prevSearch) =>
        e.target.value !== prevSearch ? e.target.value : prevSearch
      );
      setShowSuggestion(true);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch(search);
        setShowSuggestion(false);
      }
    },
    [search, onSearch]
  );

  const handleClearSearch = useCallback(() => {
    setSearch('');
    onClear();
  }, [onClear]);

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

      {stationData.length > 0 && showSuggestion && (
        <ListGroup>
          {stationData.map((station: Station) => (
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
