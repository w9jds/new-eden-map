import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KillMail } from 'models/killmail';
import { KillState } from 'models/states';

const initialState: KillState = {
  feed: {},
};

const killSlice = createSlice({
  name: 'kills',
  initialState,
  reducers: {
    addKill: (state, action: PayloadAction<KillMail>) => {
      state.feed[action.payload.killmail_id] = {
        ...action.payload,
        reported: new Date(),
      }
    },
    removeKill: (state, action: PayloadAction<number>) => {
      delete state.feed[action.payload];
    },

    registerFeed: () => {}
  }
})

export const { registerFeed, addKill, removeKill } = killSlice.actions;

export default killSlice;