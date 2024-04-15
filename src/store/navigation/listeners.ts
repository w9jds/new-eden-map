import { ApplicationState } from "models/states";
import { startListening } from "store/middleware";
import { getDestination, getFlag, getOrigin } from "./selectors";
import { calc_weighted_routes } from "eve";
import { setRoute } from "./reducer";

startListening({
  predicate: (action, currentState: ApplicationState, previousState: ApplicationState) => {
    if (getFlag(currentState) !== getFlag(previousState)) {
      return true;
    }

    if (getDestination(currentState) && getOrigin(currentState) !== getOrigin(previousState)) {
      return true;
    }

    if (getOrigin(currentState) && getDestination(currentState) !== getDestination(previousState)) {
      return true;
    }

    return false;
  },
  effect: async (action, { getState, dispatch }) => {
    const state = getState() as ApplicationState;
    const origin = getOrigin(state);
    const destination = getDestination(state);
    const flag = getFlag(state);

    const end = new Uint32Array([destination]);
    const route = await calc_weighted_routes(origin, end, flag, []);

    dispatch(setRoute(route[0]));
  }
});