import { useLazyQuery } from '@apollo/client';

import { GET_STOPS_IN_STATION } from '../graphql/queries';

export const useFetchStops = () => {
  const [fetchStops, { data: stopsData, startPolling, stopPolling }] =
    useLazyQuery(GET_STOPS_IN_STATION);

  return { fetchStops, stopsData, startPolling, stopPolling };
};
