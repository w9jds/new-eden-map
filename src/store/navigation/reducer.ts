import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RouteType } from 'models/resolvers-types';
import { NavigationState } from 'models/states';

const initialState: NavigationState = {
  open: false,
  flag: RouteType.Shortest,
  defaultId: undefined,
  route: [],
};

type TogglePayload = {
  state: boolean;
  defaultId?: number;
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<number[]>) => {
      state.route = action.payload;
    },
    setFlag: (state, action: PayloadAction<RouteType>) => {
      state.flag = action.payload;
    },
    toggleNav: (state, action: PayloadAction<TogglePayload>) => {
      if (action.payload.state === false) {
        state.defaultId = undefined;
        state.route = [];
      }

      state.defaultId = action.payload?.defaultId;
      state.open = action.payload.state;
    }
  }
});

export const { setFlag, setRoute, toggleNav } = navigationSlice.actions;

export default navigationSlice;