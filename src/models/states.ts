import { System } from './universe';

export type ApplicationState = {
  current: CurrentState;
};

export type CurrentState = {
  system: System;
}