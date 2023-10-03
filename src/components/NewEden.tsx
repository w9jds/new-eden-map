import React, { Fragment, useMemo } from 'react';

import { systems } from 'constants/systems';

import Stars from './Stars';
import Activity from './Activity';
import Connections from './Connections';

const NewEden = () => {

  const connections = useMemo(() => {
    const segments = {};

    for (let system of Object.values(systems)) {
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
  }, []);

  return (
    <Fragment>
      <Connections connections={connections} />
      <Stars solarSystems={Object.values(systems)} />
    </Fragment>
  )
};

export default NewEden;