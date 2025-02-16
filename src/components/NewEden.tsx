import React, { FC, Fragment, useMemo } from 'react';

import Stargates from './Connections';
import Kills from './Kills';

import { System } from 'models/universe';
import Regions from './Regions';

type Props = {
  systems: System[];
}

const NewEden: FC<Props> = ({ systems }) => {
  const connections = useMemo(() => {
    const segments = {};

    for (const system of systems) {
      if (system.neighbors) {
        for (const destination of system.neighbors) {
          if (!segments[destination] || segments[destination].indexOf(system.solarSystemID) == -1) {
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
      <Kills />
      <Regions />
      <Stargates connections={connections} />
    </Fragment>
  )
};

export default NewEden;