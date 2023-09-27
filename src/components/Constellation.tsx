import React from 'react';

import { systems } from 'constants/systems';
import { constellations } from 'constants/constellations';

import Stars from './Stars';

const Constellation = ({ id }) => {
  const constellation = constellations[id];
  const solarSystems = constellation.systems.map(key => systems[key]);

  return (
    <group key={constellation.name}>
      <Stars solarSystems={solarSystems} />
    </group>
  );
}

export default Constellation;