import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Mode } from '../../types/vehicleMode';
import { modeIcons } from '../../utils/modeIcons';

const Filter: React.FC<{
  onFilterChange: (modes: Mode[]) => void;
  modes: Mode[];
}> = ({ onFilterChange, modes }) => {
  const [selectedModes, setSelectedModes] = useState<Mode[]>([
    'BUS',
    'TRAM',
    'SUBWAY',
    'RAIL',
    'FERRY',
  ]);

  // Optimize mode toggling with useCallback
  const toggleMode = useCallback(
    (mode: Mode) => {
      const updatedModes = selectedModes.includes(mode)
        ? selectedModes.filter((m) => m !== mode)
        : [...selectedModes, mode];
      setSelectedModes(updatedModes);
      onFilterChange(updatedModes);
    },
    [onFilterChange, selectedModes]
  );

  // Use useMemo to prevent unnecessary re-renders
  const renderedIcons = useMemo(
    () =>
      Object.keys(modeIcons).map((mode) => (
        <Row key={mode}>
          <Col md={12}>
            <img
              src={
                selectedModes.includes(mode as keyof typeof modeIcons)
                  ? modeIcons[mode as keyof typeof modeIcons].active
                  : modeIcons[mode as keyof typeof modeIcons].inactive
              }
              alt={mode}
              width={30}
              height={30}
              onClick={() => toggleMode(mode as keyof typeof modeIcons)}
              style={{ cursor: 'pointer' }}
            />
          </Col>
        </Row>
      )),
    [selectedModes, toggleMode]
  );

  useEffect(() => {
    if (modes.length === 0) return;
    setSelectedModes(modes);
  }, [modes]);

  return (
    <div className="d-flex flex-column justify-content-center gap-3">
      {renderedIcons}
    </div>
  );
};

export default Filter;
