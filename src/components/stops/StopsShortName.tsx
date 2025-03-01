import React, { useMemo } from 'react';
import styles from './stops.module.css';
import { Mode } from '../../types/vehicleMode';
import { colors } from '../../utils/modeIcons';

const StopsShortName: React.FC<{ name: string; mode: Mode }> = ({
  name,
  mode,
}) => {
  const style = useMemo(
    () => ({ background: colors[mode], color: 'white' }),
    [mode]
  );
  return (
    <span className={styles.badge} style={style}>
      {name}
    </span>
  );
};

export default StopsShortName;
