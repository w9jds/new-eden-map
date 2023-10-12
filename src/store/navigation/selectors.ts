import { ApplicationState } from 'models/states';


export const isNavOpen = (state: ApplicationState) => state.navigation.open;

export const getOrigin = (state: ApplicationState) => state.navigation.start;

export const getDestination = (state: ApplicationState) => state.navigation.end;

export const getRoute = (state: ApplicationState) => state.navigation.route;

export const getFlag = (state: ApplicationState) => state.navigation.flag;