import { createSelector } from 'reselect';
import { isBefore } from 'date-fns';

import { ApplicationState } from 'models/states';

export const getFeed = (state: ApplicationState) => state.kills.feed;

export const getVisibleKillIds = createSelector(
  [getFeed], kills => Object.keys(kills)
    .filter(id => !kills[id].seen)
);

export const getKillFeed = createSelector(
  [getFeed, getVisibleKillIds], (kills, ids) => ids
    .sort((a, b) => {
      const killA = kills[a].reported;
      const killB = kills[b].reported;

      return isBefore(killA, killB) ? 1 : -1;
    })
    .map(id => kills[id])
);

export const getKillSystems = createSelector(
  [getFeed, getVisibleKillIds], (kills, ids) => ids
    .map(id => kills[id].solar_system_id)
    .filter((value, index, self) => self.indexOf(value) === index)
);