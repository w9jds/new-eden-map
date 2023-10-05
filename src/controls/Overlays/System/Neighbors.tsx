import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Divider, Typography } from '@mui/material';
import { getCurrentSystem } from 'store/current/selectors';
import Result from '../Search/Result';

const SystemNeighbors = () => {
  const target = useSelector(getCurrentSystem);

  return target?.neighbors?.length > 0 && (
    <Fragment>
      <Divider />
      <div className="system-neighbors">
        <Typography variant='h4'>Neighbors</Typography>
        {target.neighbors.map(id => <Result mini key={id} systemId={id} />)}
      </div>
    </Fragment>
  );
}

export default SystemNeighbors;