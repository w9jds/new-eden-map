import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { setCurrentSystem } from './actions';
import { CurrentEvents } from 'store/events';
import { CurrentState } from 'models/states';

const initialState: CurrentState = {
  system: null,
};

const current: Reducer<CurrentState> = handleActions<any>({
  [CurrentEvents.SET_CURRENT_SYSTEM]: (state: CurrentState, action: ReturnType<typeof setCurrentSystem>) => ({
    ...state,
    system: action.payload,
  }),
}, initialState);

export default current;
