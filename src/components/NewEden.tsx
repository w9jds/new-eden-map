import React, { FC, Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Stargates from './Connections';
import Regions from './Regions';

import { System } from 'models/universe';
import { getKillSystems } from 'store/kills/selectors';
import Pulse from './Kills';

type Props = {
  systems: System[];
}

const NewEden: FC<Props> = ({ systems }) => {
  const active = useSelector(getKillSystems);

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
      <Stargates connections={connections} />

      <Regions />
    </Fragment>
  )
};

export default NewEden;