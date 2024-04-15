import { FirebaseApp } from 'firebase/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { System, SystemStatistics } from 'models/universe';
import { CurrentState } from 'models/states';

const initialState: CurrentState = {
  firebase: undefined,

  system: undefined,
  statistics: undefined,
};

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setFirebaseApp: (state, action: PayloadAction<FirebaseApp>) => {
      state.firebase = action.payload;
    },

    setSystem: (state, action: PayloadAction<System>) => {
      if (!action.payload) {
        state.statistics = undefined;
      }
      
      state.system = action.payload;
    },
    setStatistics: (state, action: PayloadAction<SystemStatistics>) => {
      state.statistics = action.payload;
    }
  }
});

export const { setFirebaseApp, setSystem, setStatistics } = currentSlice.actions;

export default currentSlice;

