import { all } from 'redux-saga/effects';
import { sagas as kills } from 'store/kills/sagas';

export default function* rootSaga() {
  yield all([
    kills(),
  ]);
}
