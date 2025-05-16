import { ApplicationState } from 'models/states';


export const isNavOpen = (state: ApplicationState) => state.navigation.open;

export const getDefaultId = (state: ApplicationState) => state.navigation.defaultId;

export const getRoute = (state: ApplicationState) => state.navigation.route;

export const getFlag = (state: ApplicationState) => state.navigation.flag;