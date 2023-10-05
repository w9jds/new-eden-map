import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { KillEvents } from 'store/events';
import { KillState } from 'models/states';
import { addNewKill, flagKillAsSeen, removeKill } from './actions';

const initialState: KillState = {
  feed: {},
};

const kill: Reducer<KillState> = handleActions<any>({
  [KillEvents.ADD_NEW_KILL]: (state: KillState, action: ReturnType<typeof addNewKill>) => ({
    ...state,
    feed: {
      ...state.feed,
      [action.payload.killmail_id]: {
        ...action.payload,
        reported: new Date(),
        seen: false,
      }
    }
  }),
  [KillEvents.REMOVE_KILL]: (state: KillState, action: ReturnType<typeof removeKill>) => ({
    ...state,
    feed: Object.keys(state.feed)
      .filter(key => +key !== action.payload)
      .reduce((result, current) => {
        result[current] = state.feed[current];
        return result;
      }, {})
  }),
  [KillEvents.FLAG_KILL_AS_SEEN]: (state: KillState, action: ReturnType<typeof flagKillAsSeen>) => ({
    ...state,
    feed: {
      ...state.feed,
      [action.payload]: {
        ...state.feed[action.payload],
        seen: true,
      }
    }
  }),
}, initialState);

export default kill;
