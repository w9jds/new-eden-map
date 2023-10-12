import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { NavigationEvents } from 'store/events';
import { NavigationState } from 'models/states';
import { setDestination, setRoute, setOrigin, toggleNav } from './actions';

const initialState: NavigationState = {
  open: false,
  start: undefined,
  end: undefined,
  flag: 'shortest',

  route: [],
};

const navigation: Reducer<NavigationState> = handleActions<any>({
  [NavigationEvents.SET_DESTINATION]: (state: NavigationState, action: ReturnType<typeof setDestination>) => ({
    ...state,
    end: action.payload,
  }),
  [NavigationEvents.SET_ORIGIN]: (state: NavigationState, action: ReturnType<typeof setOrigin>) => ({
    ...state,
    start: action.payload,
  }),
  [NavigationEvents.SET_ROUTE]: (state: NavigationState, action: ReturnType<typeof setRoute>) => ({
    ...state,
    route: action.payload,
  }),
  [NavigationEvents.TOGGLE_NAV]: (state: NavigationState, action: ReturnType<typeof toggleNav>) => ({
    ...state,
    open: action.payload,
  }),
}, initialState);

export default navigation;