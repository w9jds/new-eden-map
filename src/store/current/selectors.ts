import { ApplicationState } from 'models/states';

export const getCurrentSystem = (state: ApplicationState) => state.current.system;
