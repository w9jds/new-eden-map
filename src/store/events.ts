
export enum CurrentEvents {
  SET_FIREBASE_APP = 'current/setFirebaseApp',
  SET_CURRENT_SYSTEM = 'current/setCurrentSystem',
}

export enum NavigationEvents {
  SET_DESTINATION = 'navigation/setDestination',
  SET_ORIGIN = 'navigation/setOrigin',
  SET_ROUTE = 'navigation/setRoute',
  TOGGLE_NAV = 'navigation/toggleNav',
}

export enum KillEvents {
  ADD_NEW_KILL = 'kill/addNewKill',
  REMOVE_KILL = 'kill/removeKill',
  REGISTER_KILL_FEED = 'kill/registerKillFeed',
  FLAG_KILL_AS_SEEN = 'kill/flagKillAsSeen',
}