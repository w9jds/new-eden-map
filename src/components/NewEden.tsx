import React, { FC, Fragment } from 'react';

import { useRoute } from './Route';
import Regions from './Regions';
import Stargates from './Connections';
import { useCamera } from './Camera';
import { useKillPulses } from './Kills';


const NewEden: FC = () => {
  useCamera();
  useKillPulses();
  useRoute();

  return (
    <Fragment>
      <Regions />
      <Stargates />
    </Fragment>
  )
};

export default NewEden;