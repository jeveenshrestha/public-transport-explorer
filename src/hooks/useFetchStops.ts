import { gql, useLazyQuery } from '@apollo/client';

const GET_STOPS_IN_STATION = gql`
  query GetStopsInStation($stationId: String!) {
    station(id: $stationId) {
      gtfsId
      name
      vehicleMode
      stoptimesWithoutPatterns(numberOfDepartures: 50) {
        stop {
          platformCode
        }
        serviceDay
        scheduledArrival
        scheduledDeparture
        trip {
          route {
            gtfsId
            shortName
            longName
            mode
          }
        }
        headsign
      }
    }
  }
`;

export const useFetchStops = () => {
  const [fetchStops, { data: stopsData, startPolling, stopPolling }] =
    useLazyQuery(GET_STOPS_IN_STATION);

  return { fetchStops, stopsData, startPolling, stopPolling };
};
