import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NavigationState } from 'models/states';

const initialState: NavigationState = {
  open: false,
  start: undefined,
  end: undefined,
  flag: 'shortest',

  route: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<number>) => {
      state.end = action.payload;
    },
    setOrigin: (state, action: PayloadAction<number>) => {
      state.start = action.payload;
    },
    setRoute: (state, action: PayloadAction<number[]>) => {
      state.route = action.payload;
    },
    setFlag: (state, action: PayloadAction<'shortest' | 'secure' | 'known'>) => {
      state.flag = action.payload;
    },
    toggleNav: (state, action: PayloadAction<boolean>) => {
      if (action.payload === false) {
        state.start = undefined;
        state.end = undefined;
        state.route = [];
      }

      state.open = action.payload;
    }
  }
})

export const { setDestination, setOrigin, setFlag, setRoute, toggleNav } = navigationSlice.actions;

export default navigationSlice;