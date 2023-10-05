import { all, fork, select, takeEvery } from 'redux-saga/effects';
import { DataSnapshot, Database, ref } from 'firebase/database';

import { Payload, sync } from 'store/firebase';
import { getFbDatabase } from 'store/current/selectors';
import { addNewKill, removeKill } from './actions';
import { KillEvents } from 'store/events';

function* registerKillFeed() {
  const database: Database = yield select(getFbDatabase);
  const killsRef = ref(database, `kills/feed`);

  yield all([
    fork(sync, killsRef, {
      successAction: addNewKill,
      transform: (data) => data.value,
    }, 'child_added'),
    fork(sync, killsRef, {
      successAction: removeKill,
      transform: (data: Payload) => data.snapshot.key,
    }, 'child_removed'),
  ])
}

export function* sagas() {
  yield all([
    takeEvery(KillEvents.REGISTER_KILL_FEED, registerKillFeed),
  ]);
}

// function* initialLoad(systemId: string) {
//   yield put(setLoadingStatus({ systemId, state: true }))

//   const kills = {};
//   const database: Database = yield select(getFbDatabase);
//   const feed: DataSnapshot = yield get(ref(database, `kills/feed`));

//   if (systemKills && systemKills.exists()) {
//     systemKills.forEach(child => {
//       kills[child.key] = {
//         ...child.val(),
//         wasNotified: false,
//       }
//     });

//     yield all([
//       put(setInitialLoad({ systemId, kills })),
//       put(setLoadingStatus({ systemId, state: false })),
//     ]);
//   }
// }