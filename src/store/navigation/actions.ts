import { createAction } from 'redux-actions';
import { NavigationEvents } from 'store/events';

export const toggleNav = createAction<boolean>(NavigationEvents.TOGGLE_NAV);

export const setOrigin = createAction<number>(NavigationEvents.SET_ORIGIN);

export const setDestination = createAction<number>(NavigationEvents.SET_DESTINATION);

export const setRoute = createAction<number[]>(NavigationEvents.SET_ROUTE);
