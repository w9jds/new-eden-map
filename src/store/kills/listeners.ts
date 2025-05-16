import { startListening } from "store/middleware";
import { addKill, removeKill } from "./reducer";

startListening({
  actionCreator: addKill,
  effect: async (action, { dispatch }) => {
    const { killmail_id } = action.payload;

    if (killmail_id) {
      setTimeout(() => {
        if (killmail_id) {
          dispatch(removeKill(killmail_id))
        }
      }, 30000);
    }
  }
});