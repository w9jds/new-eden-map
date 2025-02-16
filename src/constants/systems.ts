import { System } from "models/universe";

type SearchItem = {
  label: string,
  id: number
}

export const systems: System[] = require('./systems.json');

export const systemSearch: SearchItem[] = systems.map(
  system => ({
    label: system.name,
    id: system.solarSystemID
  })
);

export const systemDetails: Record<number, System> = systems.reduce(
  (out, current) => {
    out[current.solarSystemID] = current;
    return out;
  },
{});

export const systemIds: number[] = systems.map(
  (system: System) => system.solarSystemID
);

export const regions = () => {
  const out: Record<number, number[]> = {};

  for (const system of systems) {
    if (!out[system.regionID]) {
      out[system.regionID] = [ system.solarSystemID ];
    }

    out[system.regionID].push(system.solarSystemID);
  }

  return out;
}

export const center = () => {
  const sum = [0, 0, 0];
  // const min = [0, 0, 0];
  // const max = [0, 0, 0];

  for (const system of systems) {
    for (let i = 0; i < 3; i++) {
      sum[i] += +system.position[i]
      // if (+system.position[i] < +min[i]) {
      //   min[i] = +system.position[i];
      // }
      // if (+system.position[i] > +max[i]) {
      //   max[i] = +system.position[i];
      // }
    }
  }

  return [
    sum[0] / systems.length,
    sum[1] / systems.length,
    sum[2] / systems.length,
  ];
}