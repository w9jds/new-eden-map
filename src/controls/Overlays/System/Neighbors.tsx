import React, { FC, Fragment } from 'react';
import { useDispatch } from 'react-redux';

import ShipDeath from '../../../assets/ship-death.svg';
import { Chip, Divider, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';

import { Stargate } from 'models/resolvers-types';
import { setSystem } from 'store/current/reducer';
import { systemDetails } from 'constants/systems';

type Props = {
  stargates?: Stargate[];
};

const SystemNeighbors: FC<Props> = ({
  stargates = []
}) => {
  const dispatch = useDispatch();

  const navigateTo = (gate: Stargate) => {
    const { id } = gate.destination.system;
    const system = systemDetails[id];
    dispatch(setSystem(system));
  }

  return stargates?.length > 0 && (
    <Fragment>
      <Divider />
      <div className="system-neighbors">
        <Typography variant='h6'>Stargates</Typography>
        {stargates.map(gate => (
          <MenuItem key={gate.id} className="system-gate" onClick={() => navigateTo(gate)}>
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