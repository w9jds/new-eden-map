import React, { FC, Fragment } from 'react';

import Route from './Route';
import Regions from './Regions';
import Stargates from './Connections';
import { useCamera } from './Camera';
import { useKillPulses } from './Kills';


const NewEden: FC = () => {
  useCamera();
  useKillPulses();

  return (
    <Fragment>
      <Regions />
      <Stargates />
      <Route />
    </Fragment>
  )
};

export default NewEden;