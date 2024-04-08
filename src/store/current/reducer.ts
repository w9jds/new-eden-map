import { FirebaseApp } from 'firebase/app';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { System } from 'models/universe';
import { CurrentState } from 'models/states';

const initialState: CurrentState = {
  firebase: undefined,
  system: null,
};

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setFirebaseApp: (state, action: PayloadAction<FirebaseApp>) => {
      state.firebase = action.payload;
    },
    setSystem: (state, action: PayloadAction<System>) => {
      state.system = action.payload;
    }
  }
});

export const { setFirebaseApp, setSystem } = currentSlice.actions;

export default currentSlice;

