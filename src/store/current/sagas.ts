import { all, cancel, fork, put, select, takeEvery } from 'redux-saga/effects';
import { Database, ref } from 'firebase/database';
import { Payload, sync } from 'store/firebase';

import { getFbDatabase } from './selectors';
import { setStatistics, setSystem } from './reducer';

let task;

function* attachTheraListener() {
  const database: Database = yield select(getFbDatabase);
  const reference = ref(database, 'universe/thera');

  // yield all([
  //   fork(sync, reference, {
  //     successAction: setTheraConnection
  //   }, 'child_added'),
  //   fork(sync, reference, {
  //     successAction: setTheraConnection
  //   }, 'child_changed'),
  //   fork(sync, reference, {
  //     successAction: deleteTheraConnection,
  //     transform: (data: Payload) => data.snapshot.key,
  //   }, 'child_removed'),
  // ]);
}

function* systemStatistics(action: ReturnType<typeof setSystem>) {
  if (task) yield cancel(task);
  
  if (action.payload) {
    const { solarSystemID, wormholeClassID } = action.payload;
  
    if (solarSystemID && (wormholeClassID === 7 || wormholeClassID === 8 || wormholeClassID === 9)) {
      const database: Database = yield select(getFbDatabase);
      const statsRef = ref(database, `universe/systems/k_space/${solarSystemID}`);
  
      task = yield fork(sync, statsRef, {
        successAction: setStatistics,
        transform: (data: Payload) => {
          const stats = data.snapshot.val();
  
          return {
            statistics: stats.statistics,
            sovereignty: stats?.sovereignty,
            factionWarfare: stats?.factionWarfare,
          }
        },
      }, 'value');  
    }
  }
}

export function* sagas() {
  yield all([
    takeEvery(setSystem.type, systemStatistics),
  ]);
}