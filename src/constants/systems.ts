import { System } from "models/universe";

type SearchItem = {
  label: string,
  id: number
}

export const SecurityColors = {
  1: '#2c74e0',
  0.9: '#3999e9',
  0.8: '#4dccf6',
  0.7: '#60d9a3',
  0.6: '#71e554',
  0.5: '#f3fd82',
  0.4: '#da6c07',
  0.3: '#cc440f',
  0.2: '#ba1117',
  0.1: '#732020',
  0: '#8c3263',
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const systems: System[] = require('./systems.json');

export const systemSearch: SearchItem[] = systems.map(
  system => ({
    label: system.name,
    id: system.solarSystemID
  })
);

export const systemDetails: Record<number, System> = systems.reduce(
  (out, current) => {
    out[current.solarSystemID] = {
      ...current,
      radius: current.radius / 5000000000000,
      position: [
        current.position[0] / 1000000000000000,
        -(current.position[1] / 1000000000000000),
        current.position[2] / 1000000000000000
      ]
    };
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