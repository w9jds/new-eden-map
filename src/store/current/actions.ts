import { System } from 'models/universe';
import { createAction } from 'redux-actions';

import { CurrentEvents } from 'store/events';

export const setCurrentSystem = createAction<System>(CurrentEvents.SET_CURRENT_SYSTEM);
