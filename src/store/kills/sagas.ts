import { all, fork, select, takeEvery } from 'redux-saga/effects';
import { Database, ref } from 'firebase/database';

import { sync } from 'store/firebase';
import { getFbDatabase } from 'store/current/selectors';
import { addKill, registerFeed } from './reducer';

function* registerKillFeed() {
  const database: Database = yield select(getFbDatabase);
  const killsRef = ref(database, `kills/feed`);

  yield all([
    fork(sync, killsRef, {
      successAction: addKill,
      transform: (data) => data.value,
    }, 'child_added'),
  ])
}

export function* sagas() {
  yield all([
    takeEvery(registerFeed.type, registerKillFeed),
  ]);
}
