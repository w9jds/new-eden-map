import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { setCurrentSystem, setFirebaseApp } from './actions';
import { CurrentEvents } from 'store/events';
import { CurrentState } from 'models/states';

const initialState: CurrentState = {
  firebase: undefined,

  system: null,
};

const current: Reducer<CurrentState> = handleActions<any>({
  [CurrentEvents.SET_FIREBASE_APP]: (state: CurrentState, action: ReturnType<typeof setFirebaseApp>) => ({
    ...state,
    firebase: action.payload,
  }),
  [CurrentEvents.SET_CURRENT_SYSTEM]: (state: CurrentState, action: ReturnType<typeof setCurrentSystem>) => ({
    ...state,
    system: action.payload,
  }),
}, initialState);

export default current;
