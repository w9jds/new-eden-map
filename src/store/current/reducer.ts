import { FirebaseApp } from 'firebase/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { System, SystemStatistics } from 'models/universe';
import { CurrentState, SpaceClusters } from 'models/states';
import { systemDetails } from 'constants/systems';

const initialState: CurrentState = {
  firebase: undefined,

  system: undefined,
  universe: systemDetails,
  statistics: undefined,
  cluster: SpaceClusters.Known
};

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setFirebaseApp: (state, action: PayloadAction<FirebaseApp>) => {
      state.firebase = action.payload;
    },

    setCluster: (state, action: PayloadAction<SpaceClusters>) => {
      state.cluster = action.payload;
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

export const { setFirebaseApp, setSystem, setStatistics, setCluster } = currentSlice.actions;

export default currentSlice;

