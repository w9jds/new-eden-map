import { FirebaseApp } from 'firebase/app';
import { System } from './universe';

export type ApplicationState = {
  current: CurrentState;
};

export type CurrentState = {
  readonly firebase: FirebaseApp;

  system: System;
}