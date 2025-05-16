import { gql } from '@apollo/client';
import { GroupSovereignty } from 'models/resolvers-types';

export type SovereigntyResponse = GroupSovereignty[];

export const SovereigntyQuery = gql`
  query Sovereignty {
    sovereignty {
      alliance {
        name
        ticker
      }
      systems {
        name
        position {
          x
          y
          z
        }
      }
    }
  }
`;
