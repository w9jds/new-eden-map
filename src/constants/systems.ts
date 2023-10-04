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