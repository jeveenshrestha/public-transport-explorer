import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.digitransit.fi/routing/v2/hsl/gtfs/v1',
    headers: {
      'digitransit-subscription-key': import.meta.env.VITE_HSL_API_KEY,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
