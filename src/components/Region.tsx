import { constellations } from 'constants/constellations';
import { systems } from 'constants/systems';

import React, { useMemo, useEffect } from 'react';

import { Region, System } from 'models/universe';
import Stars from './Stars';
import Connections from './Connections';

type Props = {
  data: Region;
}

const Region = ({ data }: Props) => {
  
  const solarSystems: Record<number, System> = useMemo(() => {
    const info = {};

    for (let id of data.constellations) {
      const constellation = constellations[id];
      
      for (let systemId of constellation.systems) {
        info[systemId] = systems[systemId];
      }
    }

    return info;
  }, [data]);

  const connections = useMemo(() => {
    const segments = {};

    for (let system of Object.values(solarSystems)) {
      if (system.connections) {
        for (let destination of system.connections) {
          if (!segments[destination] || segments[destination].indexOf(system.id) == -1) {
            if (!segments[system.id]) {
              segments[system.id] = [destination];
            } else {
              segments[system.id].push(destination);
            }
          }
        }
      }
    }
    
    return segments;
  }, [solarSystems]);

  return (
    <group name={data.name}>
      <Connections connections={connections} />
      <Stars solarSystems={Object.values(solarSystems)} />
    </group>
  );
};

export default Region;