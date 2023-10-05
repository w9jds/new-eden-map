import { ApplicationState } from 'models/states';


export const getKillFeed = (state: ApplicationState) => state.kills.feed;
