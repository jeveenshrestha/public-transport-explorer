import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Mode } from '../types/vehicleMode';
import { modeIcons } from '../utils/modeIcons';

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

  const toggleMode = (mode: Mode) => {
    const updatedModes = selectedModes.includes(mode)
      ? selectedModes.filter((m) => m !== mode)
      : [...selectedModes, mode];
    setSelectedModes(updatedModes);
    onFilterChange(updatedModes);
  };

  useEffect(() => {
    if (modes.length === 0) return;
    setSelectedModes(modes);
  }, [modes]);

  return (
    <div className="d-flex flex-column justify-content-center gap-3">
      {Object.keys(modeIcons).map((mode) => (
        <Row key={mode}>
          <Col md={12}>
            <img
              src={
                selectedModes.includes(mode as keyof typeof modeIcons)
                  ? modeIcons[mode as keyof typeof modeIcons].active
                  : modeIcons[mode as keyof typeof modeIcons].inactive
              }
              alt={mode}
              width={50}
              height={50}
              onClick={() => toggleMode(mode as keyof typeof modeIcons)}
              style={{ cursor: 'pointer' }}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Filter;
