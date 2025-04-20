import { System } from "models/universe";

type SearchItem = {
  label: string,
  id: number
}

export const SecurityColors = {
  1: '#2e74df',
  0.9: '#379cf6',
  0.8: '#4acef5',
  0.7: '#5cdca6',
  0.6: '#70e452',
  0.5: '#f1fe83',
  0.4: '#e0690e',
  0.3: '#ce450b',
  0.2: '#bc1112',
  0.1: '#6c2222',
  0: '#903066',
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
      radius: current.radius / 1000500000000,
      position: [
        current.position[0] / 1000000000000000,
        current.position[1] / 1000000000000000,
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


export const mapDimensions = () => {
  if (!systems || systems.length === 0) {
    return null; // Or return a default box
  }

  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  for (const system of systems) {
    const [x, y, z] = system.position;

    min[0] = Math.min(min[0], x);
    min[1] = Math.min(min[1], y);
    min[2] = Math.min(min[2], z);

    max[0] = Math.max(max[0], x);
    max[1] = Math.max(max[1], y);
    max[2] = Math.max(max[2], z);
  }

  if (min[0] === Infinity) {
     return {
      min: [0,0,0],
      max: [0,0,0],
      center: [0,0,0],
      size: [0,0,0],
      radius: 0
    };
  }

  const center = [
    (min[0] + max[0]) / 2,
    (min[1] + max[1]) / 2,
    (min[2] + max[2]) / 2,
  ];

  const size = [
    max[0] - min[0],
    max[1] - min[1],
    max[2] - min[2],
  ];

  const dx = max[0] - center[0];
  const dy = max[1] - center[1];
  const dz = max[2] - center[2];
  const radius = Math.sqrt(dx*dx + dy*dy + dz*dz);

  return { min, max, center, size, radius };
}
