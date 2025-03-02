import React, { useCallback, useMemo, useState } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

import { Stop, StopTimesWithoutPatterns } from '../../types/station';
import RouteList from '../routeList/RouteList';

import styles from './Stops.module.css';
import StopTimesList from '../stopTimesList/StopTimesList';

const Stops: React.FC<{
  stop: Stop;
}> = ({ stop }) => {
  const [selectedShortNames, setSelectedShortNames] = useState<string[]>([]);

  const handleFilterChange = useCallback((routeShortName: string[]) => {
    setSelectedShortNames(routeShortName);
  }, []);

  const filteredStations = useMemo(() => {
    if (selectedShortNames.length === 0) return stop.stoptimesWithoutPatterns;
    return (
      stop.stoptimesWithoutPatterns.filter(
        (pattern: StopTimesWithoutPatterns) =>
          selectedShortNames &&
          selectedShortNames.includes(pattern.trip.route.shortName)
      ) || []
    );
  }, [stop.stoptimesWithoutPatterns, selectedShortNames]);

  return (
    <Row className="mt-4">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className={styles.stops}>
              <div className="d-flex justify-content-start gap-2">
                {stop.name}
              </div>
              <RouteList onFilterChange={handleFilterChange} stop={stop} />
            </Card.Title>
            <ListGroup>
              <StopTimesList patterns={filteredStations} />
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Stops;
