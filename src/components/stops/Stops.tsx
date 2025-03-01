import React, { useMemo } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';

import { Stop, StopTimesWithoutPatterns } from '../../types/station';
import { modeIcons } from '../../utils/modeIcons';
import StopsShortName from './StopsShortName';
import { getTime } from '../../utils/helper';

import styles from './stops.module.css';

const Stops: React.FC<{
  stop: Stop;
}> = ({ stop }) => {
  const stopTimesList = useMemo(
    () =>
      stop.stoptimesWithoutPatterns.map(
        (pattern: StopTimesWithoutPatterns, index: number) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={2}>
                <StopsShortName
                  mode={pattern.trip.route.mode}
                  name={pattern.trip.route.shortName}
                />
              </Col>
              <Col className={styles.stops} md={5}>
                {pattern.headsign}
              </Col>
              <Col md={2}>
                {getTime(pattern.serviceDay, pattern.scheduledDeparture)}
              </Col>
              <Col md={3}>{pattern.stop.platformCode || 'N/A'}</Col>
            </Row>
          </ListGroup.Item>
        )
      ),
    [stop.stoptimesWithoutPatterns]
  );
  return (
    <Row className="mt-4">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title className={styles.stops}>
              <div className="d-flex justify-content-start gap-2">
                {stop.name}
                <img
                  width={16}
                  src={
                    modeIcons[stop.vehicleMode as keyof typeof modeIcons]
                      .active || ''
                  }
                />
              </div>
            </Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <h6>Route</h6>
                  </Col>
                  <Col className={styles.stops} md={5}>
                    <h6>Destination</h6>
                  </Col>
                  <Col md={2}>
                    <h6>Leaving at</h6>
                  </Col>
                  <Col md={3}>
                    <h6>Platform</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              {stopTimesList}
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Stops;
