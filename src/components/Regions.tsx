import React, { useMemo } from 'react';

import { regions } from 'constants/systems';
import Stars from './Stars';

const Regions = () => {
  const data = useMemo(() => regions(), []);

  return Object.keys(data).map(
    regionId => <Stars key={regionId} ids={data[regionId]} />
  );
}

export default Regions;