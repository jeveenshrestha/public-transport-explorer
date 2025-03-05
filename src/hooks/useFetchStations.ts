import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';

import { GET_STATIONS, GET_STATIONS_BY_LOCATION } from '../graphql/queries';
import { NearestStation, Station } from '../types/station';
import { Mode } from '../types/vehicleMode';

export const useFetchStations = () => {
  const [stationData, setStationData] = useState<Station[]>([]);
  const [selectedModes, setSelectedModes] = useState<Mode[]>([]);
  const [loadingStation, setLoadingStation] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const [fetchStationsByLocation] = useLazyQuery(GET_STATIONS_BY_LOCATION, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.nearest?.edges.length !== 0) {
        const stations =
          data?.nearest?.edges
            .map((edge: NearestStation) => edge.node.place)
            .filter((station: Station) => station.vehicleMode !== null) || [];
        const modes = Array.from(
          new Set(stations.map((station: Station) => station.vehicleMode))
        ) as Mode[];
        setStationData(stations);
        setSelectedModes(modes);
        setError(null);
      } else {
        setError({ message: 'There are no stations near you!!' });
      }
      setLoadingStation(false);
    },
  });

  const [fetchStations] = useLazyQuery(GET_STATIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.stations.length !== 0) {
        const stations =
          data?.stations.filter(
            (station: Station) => station.vehicleMode !== null
          ) || [];
        const modes = Array.from(
          new Set(data?.stations.map((station: Station) => station.vehicleMode))
        ) as Mode[];
        setStationData(stations);
        setSelectedModes(modes);
        setError(null);
      } else {
        setError({ message: 'No such station found!!' });
      }
      setLoadingStation(false);
    },
  });

  return {
    error,
    stationData,
    setStationData,
    selectedModes,
    loadingStation,
    fetchStationsByLocation,
    fetchStations,
    setSelectedModes,
  };
};
