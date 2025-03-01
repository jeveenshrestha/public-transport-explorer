import { gql } from '@apollo/client';

export const GET_STATIONS_BY_LOCATION = gql`
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

export const GET_STATIONS = gql`
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

export const GET_STOPS_IN_STATION = gql`
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
