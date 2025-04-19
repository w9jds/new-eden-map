import React, { FC, Fragment, useMemo } from 'react';

import Regions from './Regions';
import Stargates from './Connections';
import { useCamera } from './Camera';
import { useKillPulses } from './Kills';

import { System } from 'models/universe';

type Props = {
  systems: System[];
}

const NewEden: FC<Props> = ({ systems }) => {
  useKillPulses();
  useCamera();

  const connections = useMemo(() => {
    const segments = {};

    for (const system of systems) {
      if (system.neighbors) {
        for (const destination of system.neighbors) {
          if (!segments[destination] || !segments[destination].includes(system.solarSystemID)) {
            if (!segments[system.solarSystemID]) {
              segments[system.solarSystemID] = [destination];
            } else {
              segments[system.solarSystemID].push(destination);
            }
          }
        }
      }
    }

    return segments;
  }, [systems]);

  return (
    <Fragment>
      <Regions />
      <Stargates connections={connections} />
    </Fragment>
  )
};

export default NewEden;