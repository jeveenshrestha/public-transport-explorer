import React, { useCallback, useMemo, useState } from 'react';

import { Stop, StopTimesWithoutPatterns } from '../../types/station';
import { colors } from '../../utils/modeIcons';
import { Mode } from '../../types/vehicleMode';

import styles from './RouteList.module.css';

const RouteList: React.FC<{
  onFilterChange: (shortName: string[]) => void;
  stop: Stop;
}> = ({ onFilterChange, stop }) => {
  const routeShortName = useMemo(
    () =>
      Array.from(
        new Set(
          stop.stoptimesWithoutPatterns.map(
            (pattern: StopTimesWithoutPatterns) => pattern.trip.route.shortName
          )
        )
      ),
    [stop.stoptimesWithoutPatterns]
  );
  const [selectedShortNames, setSelectedShortNames] = useState<string[]>([]);

  // Toggle selected routes using functional state updates
  const toggleRoute = useCallback(
    (name: string) => {
      const updatedNames = selectedShortNames.includes(name)
        ? selectedShortNames.filter((n) => n !== name)
        : [...selectedShortNames, name];
      setSelectedShortNames(updatedNames);
      onFilterChange(updatedNames);
    },
    [onFilterChange, selectedShortNames]
  );

  return (
    <div className={`${styles.routesList} d-flex justify-content-start gap-2`}>
      {routeShortName.map((shortName: string) => {
        const isSelected = selectedShortNames.includes(shortName);
        const backgroundColor = isSelected
          ? colors[stop.vehicleMode as Mode]
          : 'transparent';
        const textColor = isSelected ? 'white' : 'inherit';

        return (
          <span
            key={shortName}
            style={{
              background: backgroundColor,
              color: textColor,
              cursor: 'pointer',
            }}
            className={styles.badge}
            onClick={() => toggleRoute(shortName)}
          >
            {shortName}
          </span>
        );
      })}
    </div>
  );
};

export default RouteList;
