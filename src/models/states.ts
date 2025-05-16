import { FirebaseApp } from 'firebase/app';
import { RouteType } from './resolvers-types';

import { System } from './universe';
import { KillMail } from './killmail';

export enum SpaceClusters {
  Known = 'known',
  Wormhole1 = 'wormhole1',
  Wormhole2 = 'wormhole2',
}

export type ApplicationState = {
  readonly current: CurrentState;
  readonly navigation: NavigationState;
  readonly kills: KillState;
};

export type CurrentState = {
  readonly firebase: FirebaseApp;

  readonly system: System;
  readonly universe: Record<number, System>;
  readonly cluster: SpaceClusters;
}

export type NavigationState = {
  readonly open: boolean;
  readonly flag: RouteType;

  readonly defaultId?: number;
  readonly route: number[];
}

export type KillState = {
  readonly feed: Record<number, KillMail>;
}