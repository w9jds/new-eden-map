import { all } from 'redux-saga/effects';
import { sagas as kills } from 'store/kills/sagas';
import { sagas as navigation } from 'store/navigation/sagas';

export default function* rootSaga() {
  yield all([
    kills(),
    navigation(),
  ]);
}
