// import { all, call, put, select, takeEvery } from 'redux-saga/effects';
// import { calc_weighted_routes, Connection } from 'eve';
// import { NavigationEvents } from 'store/events';

// import { setRoute } from './actions';
// import { getDestination, getFlag, getOrigin } from './selectors';

// function* calculateRoute() {
//   try {
//     yield put(setRoute([]));
//     const origin = yield select(getOrigin);
//     const destination = yield select(getDestination);
//     const flag = yield select(getFlag);

//     if (origin && destination) {
//       const data = yield call(fetchRoutes, +origin, [destination], [], flag);
//       yield put(setRoute(data));
//     }

//   } catch (error) {
//     console.error(error);
//     yield put(setRoute([]));
//   }
// }

// const fetchRoutes = async (originId: number, destinations: number[], connections: Connection[], flag: string) => {
//   const ends = new Uint32Array(destinations);
//   const routes = await calc_weighted_routes(originId, ends, flag, connections);

//   return routes[0];
// }

// export function* sagas() {
//   yield all([
//     takeEvery([ NavigationEvents.SET_DESTINATION, NavigationEvents.SET_ORIGIN ], calculateRoute),
//   ]);
// }