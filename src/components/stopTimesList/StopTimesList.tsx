import React, { useMemo } from 'react';
import { StopTimesWithoutPatterns } from '../../types/station';
import { ListGroup } from 'react-bootstrap';
import { getTime } from '../../utils/helper';
import { modeIcons } from '../../utils/modeIcons';

import styles from './StopTimesList.module.css';
import routeListStyles from '../routeList/RouteList.module.css';

const StopTimesList: React.FC<{ patterns: StopTimesWithoutPatterns[] }> = ({
  patterns,
}) => {
  const stopTimesList = useMemo(
    () =>
      patterns.map((pattern: StopTimesWithoutPatterns, index: number) => (
        <ListGroup.Item key={index}>
          <div className="d-flex justify-content-between text-body">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-start gap-2 align-item-center">
                <img
                  width={15}
                  src={modeIcons[pattern.trip.route.mode].active || ''}
                />
                <div className={`${styles.stops} text-secondary`}>
                  <span className={routeListStyles.badge}>
                    {pattern.trip.route.shortName}
                  </span>
                </div>
                <span className="text-secondary">{pattern.headsign}</span>
              </div>
              <div className="d-flex gap-2">
                <div>{`Scheduled . ${getTime(
                  pattern.serviceDay,
                  pattern.scheduledDeparture
                )}`}</div>
                <div>
                  {!pattern.stop.platformCode
                    ? ''
                    : `Platform ${pattern.stop.platformCode}`}
                </div>
              </div>
            </div>
            <div className="text-dark">
              {getTime(pattern.serviceDay, pattern.scheduledDeparture)}
            </div>
          </div>
        </ListGroup.Item>
      )),
    [patterns]
  );

  return <div>{stopTimesList}</div>;
};

export default StopTimesList;
