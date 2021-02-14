import { constellations } from 'constants/constellations';
import { systems } from 'constants/systems';

import React, { useMemo, useEffect } from 'react';

import { Region } from 'models/universe';
import Stars from './Stars';

type Props = {
  data: Region;
}

const Region = ({ data }: Props) => {
  
  const solarSystems = useMemo(() => {
    const info = {};

    for (let id of data.constellations) {
      const constellation = constellations[id];
      
      for (let systemId of constellation.systems) {
        info[systemId] = systems[systemId];
      }
    }

    return info;
  }, [data]);

  return (
    <group name={data.name}>
      <Stars solarSystems={Object.values(solarSystems)} />
    </group>
  );
};

export default Region;