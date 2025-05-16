import { FirebaseApp } from 'firebase/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { System } from 'models/universe';
import { CurrentState, SpaceClusters } from 'models/states';
import { systemDetails } from 'constants/systems';

const initialState: CurrentState = {
  firebase: undefined,

  system: undefined,
  universe: systemDetails,
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
      state.system = action.payload;
    }
  }
});

export const { setFirebaseApp, setSystem, setCluster } = currentSlice.actions;

export default currentSlice;

