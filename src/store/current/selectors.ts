import { createSelector } from 'reselect';
import { getDatabase } from 'firebase/database';
import { ApplicationState } from 'models/states';

export const getFirebaseApp = (state: ApplicationState) => state.current.firebase;

export const getCurrentSystem = (state: ApplicationState) => state.current.system;

export const getFbDatabase = createSelector(
  [getFirebaseApp], firebase =>
    firebase && getDatabase(firebase)
);