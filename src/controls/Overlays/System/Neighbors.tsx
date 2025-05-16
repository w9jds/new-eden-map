import React, { FC, Fragment } from 'react';

import ShipDeath from '../../../assets/ship-death.svg';
import { Chip, Divider, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';

import { Stargate } from 'models/resolvers-types';

type Props = {
  stargates?: Stargate[];
};

const SystemNeighbors: FC<Props> = ({
  stargates = []
}) => {
  // const dispatch = useDispatch();

  // const navigateTo = (e, system: System) => {
  //   dispatch(setSystem(system));
  // }

  return stargates?.length > 0 && (
    <Fragment>
      <Divider />
      <div className="system-neighbors">
        <Typography variant='h6'>Stargates</Typography>
        {stargates.map(gate => (
          <MenuItem key={gate.id} className="system-gate">
            <ListItemIcon className="status">
              <span>
                {gate.destination.system.securityStatus.toFixed(1)}
              </span>
            </ListItemIcon>
            <ListItemText className="results">
              {gate.destination.system.name}
            </ListItemText>
            <div className="indicator">
              {
                !!gate.kills.count &&
                  <Chip icon={<ShipDeath />} label={gate.kills.count} variant="outlined" />
              }
            </div>
          </MenuItem>
        ))}
      </div>
    </Fragment>
  );
}

export default SystemNeighbors;