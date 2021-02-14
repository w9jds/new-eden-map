export type System = {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
  luminosity: number;
  radius: number;
  security?: number;
  connections?: number[];
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