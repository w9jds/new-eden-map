import React, { FC, Fragment, useMemo } from 'react';

import Connections from './Connections';
import { System } from 'models/universe';
import Star from './Star';

type Props = {
  systems: System[];
}

const NewEden: FC<Props> = ({ systems }) => {

  const connections = useMemo(() => {
    const segments = {};

    for (let system of systems) {
      if (system.neighbors) {
        for (let destination of system.neighbors) {
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
      <Connections connections={connections} />
      { systems.map(system => <Star key={system.solarSystemID} system={system} />) }
    </Fragment>
  )
};

export default NewEden;