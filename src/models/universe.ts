export enum WarfareSystemStatus {
  Captured = 'captured', 
  Contested = 'contested', 
  Uncontested = 'uncontested', 
  Vulnerable = 'vulnerable'
}

export type System = {
  name: string;
  solarSystemID: number;
  luminosity: number;
  radius: number;
  security: number;
  position: number[];
  constellationName: string;
  constellationID: number;
  regionName: string;
  regionID: number;
  wormholeClassID: number;
  typeID: number;
  typeName: string;
  neighbors: number[];
}

export type SystemStatistics = {
  sovereignty?: Sovereignty;
  statistics?: Record<string, Statistics>;
  factionWarfare?: FactionWarfare;
}

type FactionWarfare = {
  contested: WarfareSystemStatus;
  occupierFaction: string;
  occupierFactionId: number;
  ownerFaction: string;
  ownerFactionId: number;
  victoryPoints: number;
  victoryPointsThreshold: number;
}

type Sovereignty = {
  allianceId?: number;
  allianceName?: string;
  corporationId?: number;
  corporationName?: string;
}


export type Region = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  constellations: number[];
}

export type Constellation = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  systems: number[];
}

export type Statistics = {
  jumps: number;
  kills: {
    npcKills: number;
    podKills: number;
    shipKills: number;
  }
  processed_at: number;
}
