import { gql, useLazyQuery } from '@apollo/client';
import { NearestStation, Station } from '../types/station';
import { Mode } from '../types/vehicleMode';
import { useState } from 'react';

const GET_STATIONS_BY_LOCATION = gql`
  query GetNearestStations($lat: Float!, $lon: Float!, $radius: Int!) {
    nearest(
      lat: $lat
      lon: $lon
      maxDistance: $radius
      filterByPlaceTypes: [STATION]
    ) {
      edges {
        node {
          place {
            ... on Stop {
              gtfsId
              name
              lat
              lon
              vehicleMode
            }
          }
        }
      }
    }
  }
`;

const GET_STATIONS = gql`
  query GetStations($query: String!) {
    stations(name: $query) {
      gtfsId
      name
      lat
      lon
      vehicleMode
    }
  }
`;

export const useFetchStations = () => {
  const [stationData, setStationData] = useState<Station[]>([]);
  const [selectedModes, setSelectedModes] = useState<Mode[]>([]);
  const [loadingStation, setLoadingStation] = useState(false);

  const [fetchStationsByLocation] = useLazyQuery(GET_STATIONS_BY_LOCATION, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.nearest?.edges) {
        const stations =
          data?.nearest?.edges
            .map((edge: NearestStation) => edge.node.place)
            .filter((station: Station) => station.vehicleMode !== null) || [];
        const modes = Array.from(
          new Set(stations.map((station: Station) => station.vehicleMode))
        ) as Mode[];
        setStationData(stations);
        setSelectedModes(modes);
      }
      setLoadingStation(false);
    },
  });

  const [fetchStations] = useLazyQuery(GET_STATIONS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.stations) {
        const stations =
          data?.stations.filter(
            (station: Station) => station.vehicleMode !== null
          ) || [];
        setStationData(stations);
        const modes = Array.from(
          new Set(data?.stations.map((station: Station) => station.vehicleMode))
        ) as Mode[];
        setStationData(stations);
        setSelectedModes(modes);
      }
      setLoadingStation(false);
    },
  });

  return {
    stationData,
    selectedModes,
    loadingStation,
    fetchStationsByLocation,
    fetchStations,
    setSelectedModes,
  };
};
