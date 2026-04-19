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
        position {
          x
          y
          z
        }
      }
      destination {
        kills {
          count
          isPotentialCamp
        }
        system {
          id
          name
          securityStatus
          position {
            x
            y
            z
          }
        }
      }
    }
  }
`

export const useRouteQuery = () => {
  const [getRoute, { loading, data, error }] = useLazyQuery<Response, Args>(Query);

  return {
    getRoute,
    loading,
    data,
    error,
  };
}