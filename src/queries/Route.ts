import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { RouteOptions, Stargate } from 'models/resolvers-types';

type Args = {
  options: RouteOptions;
};

type Response = {
  routes: Stargate[][];
};

const Query = gql`
  query Routes($options: RouteOptions) {
    routes(options: $options) {
      name
      kills {
        count
        isPotentialCamp
      }
      system {
        id
        name
        securityStatus
      }
      destination {
        name
        kills {
          count
          isPotentialCamp
        }
        system {
          id
          name
          securityStatus
        }
      }
    }
  }
`

export const useRouteQuery = () => {
  const [getRoute, { loading, data, error }] = useLazyQuery<Response, Args>(Query, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    getRoute,
    loading,
    data,
    error,
  };
}
