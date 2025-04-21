import { FirebaseApp } from 'firebase/app';

import { System, SystemStatistics } from './universe';
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
  readonly statistics: SystemStatistics;
  readonly cluster: SpaceClusters;
}

export type NavigationState = {
  readonly open: boolean;
  readonly start: number;
  readonly end: number;
  readonly flag: 'shortest' | 'secure' | 'less-safe';

  readonly route: number[];
}

export type KillState = {
  readonly feed: Record<number, KillMail>;
}