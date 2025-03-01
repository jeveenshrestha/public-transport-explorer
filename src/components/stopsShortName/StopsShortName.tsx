import React from 'react';
import styles from './style.module.css';
import { Mode } from '../../types/vehicleMode';
import { colors } from '../../utils/modeIcons';

const StopsShortName: React.FC<{ name: string; mode: Mode }> = ({
  name,
  mode,
}) => {
  const bg = {
    background: colors[mode],
    color: 'white',
  };
  return (
    <span className={styles.badge} style={bg}>
      {name}
    </span>
  );
};

export default StopsShortName;
