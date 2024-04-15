import { all } from 'redux-saga/effects';
import { sagas as kills } from 'store/kills/sagas';
import { sagas as current } from 'store/current/sagas';

export default function* rootSaga() {
  yield all([
    current(),
    kills(),
  ]);
}
