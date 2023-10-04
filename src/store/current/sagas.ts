import { all, fork, select } from 'redux-saga/effects';
import { Database, ref } from 'firebase/database';
import { sync } from 'store/firebase';

import { getFbDatabase } from './selectors';


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