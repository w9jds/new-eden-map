import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';

import { KillEvents } from 'store/events';
import { KillState } from 'models/states';
import { addNewKill } from './actions';

const initialState: KillState = {
  feed: [],
};

const kill: Reducer<KillState> = handleActions<any>({
  [KillEvents.ADD_NEW_KILL]: (state: KillState, action: ReturnType<typeof addNewKill>) => ({
    ...state,
    feed: [...state.feed, action.payload]
  }),

}, initialState);

export default kill;
