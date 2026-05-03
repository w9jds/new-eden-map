import { createSelector } from 'reselect';
import { getDatabase } from 'firebase/database';
import { ApplicationState } from 'models/states';

export const getFirebaseApp = (state: ApplicationState) => state.current.firebase;

export const getCurrentSystem = (state: ApplicationState) => state.current.system;

export const getUniverse = (state: ApplicationState) => state.current.universe;

export const getCluster = (state: ApplicationState) => state.current.cluster;

export const getFbDatabase = createSelector(
  [getFirebaseApp], firebase =>
    firebase && getDatabase(firebase)
);