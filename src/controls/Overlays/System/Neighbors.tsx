import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Divider, Typography } from '@mui/material';
import { getCurrentSystem } from 'store/current/selectors';
import SystemTile from 'controls/SystemTile';
import { System } from 'models/universe';
import { setSystem } from 'store/current/reducer';

const SystemNeighbors = () => {
  const dispatch = useDispatch();
  const target = useSelector(getCurrentSystem);

  const navigateTo = (e, system: System) => {
    dispatch(setSystem(system));
  }

  return target?.neighbors?.length > 0 && (
    <Fragment>
      <Divider />
      <div className="system-neighbors">
        <Typography variant='h6'>Neighbors</Typography>
        {target.neighbors.map(id => <SystemTile mini key={id} systemId={id} onClick={navigateTo} />)}
      </div>
    </Fragment>
  );
}

export default SystemNeighbors;