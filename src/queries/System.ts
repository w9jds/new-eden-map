import { gql } from '@apollo/client';
import { SolarSystem } from 'models/resolvers-types';

export type DetailsResponse = {
  systems: SolarSystem[];
}

export const DetailsQuery = gql`
  query Systems($ids: [Int!]!) {
    systems(ids: $ids) {
      name
      securityStatus
      constellation {
        name
        region {
          name
        }
      }
      stargates {
        name
        kills {
          count
          isPotentialCamp
        }
        destination {
          name
          system {
            name
            securityStatus
          }
        }
      }
      sovereignty {
        alliance {
          name
          ticker
        }
        corporation {
          name
          ticker
        }
      }
      statistics(hours: 48) {
        jumps
        npcKills
        podKills
        shipKills
        processedAt
      }
    }
  }
`