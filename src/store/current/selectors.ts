import { createSelector } from 'reselect';
import { getDatabase } from 'firebase/database';
import { ApplicationState } from 'models/states';
import { SystemStatistics } from 'models/universe';
import { compareAsc } from 'date-fns';

export const getFirebaseApp = (state: ApplicationState) => state.current.firebase;

export const getCurrentSystem = (state: ApplicationState) => state.current.system;

export const getStatistics = (state: ApplicationState) => state.current.statistics;

export const getStatisticData = createSelector(
  [getStatistics], (details: SystemStatistics) => {
    if (details?.statistics) {
      return Object.values(details.statistics)
        .map(stats => ({
          timestamp: new Date(stats.processed_at),
          jumps: stats.jumps,
          npc_kills: stats.kills.npcKills,
          pod_kills: stats.kills.podKills,
          ship_kills: stats.kills.shipKills,
        }))
        .sort(
          (a, b) => compareAsc(a.timestamp, b.timestamp)
        )
    }
  }
);

export const getFbDatabase = createSelector(
  [getFirebaseApp], firebase =>
    firebase && getDatabase(firebase)
);