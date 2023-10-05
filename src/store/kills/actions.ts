import { createAction } from 'redux-actions';
import { KillMail } from 'models/killmail';
import { KillEvents } from 'store/events';

export const registerKillFeed = createAction(KillEvents.REGISTER_KILL_FEED);

export const addNewKill = createAction<KillMail>(KillEvents.ADD_NEW_KILL);

export const removeKill = createAction<number>(KillEvents.REMOVE_KILL);

export const flagKillAsSeen = createAction<number>(KillEvents.FLAG_KILL_AS_SEEN);
