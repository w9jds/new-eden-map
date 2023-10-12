import { FirebaseApp } from 'firebase/app';

import { System } from './universe';
import { KillMail } from './killmail';

export type ApplicationState = {
  readonly current: CurrentState;
  readonly navigation: NavigationState;
  readonly kills: KillState;
};

export type CurrentState = {
  readonly firebase: FirebaseApp;
  readonly system: System;
}

export type NavigationState = {
  readonly open: boolean;
  readonly start: number;
  readonly end: number;
  readonly flag: 'shortest' | 'secure' | 'known';

  readonly route: number[];
}

export type KillState = {
  readonly feed: Record<number, KillMail>;
}