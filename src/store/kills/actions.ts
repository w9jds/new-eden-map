import { createAction } from 'redux-actions';
import { KillMail } from 'models/killmail';
import { KillEvents } from 'store/events';

export const addNewKill = createAction<KillMail>(KillEvents.ADD_NEW_KILL);
