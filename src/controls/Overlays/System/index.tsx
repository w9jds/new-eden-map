import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Divider, Fab, Paper, Typography } from '@mui/material';
import { Directions } from '@mui/icons-material';
import SystemStatistics from './Statistics';
import SystemNeighbors from './Neighbors';

import Zkillboard from 'assets/zkill-logo.svg';
import Dotlan from 'assets/dotlan-logo.svg';
import background from 'assets/overlay-header.jpg';

import { isNavOpen } from 'store/navigation/selectors';
import { getCurrentSystem } from 'store/current/selectors';
import { setDestination, toggleNav } from 'store/navigation/reducer';

import './index.scss';

type Props = {};

const SystemOverlay: FC<Props> = () => {
  const dispatch = useDispatch();
  const system = useSelector(getCurrentSystem);
  const isNavigating = useSelector(isNavOpen);

  const onNavigate = () => {
    dispatch(setDestination(system.solarSystemID));
    dispatch(toggleNav(true));
  }

  const onZKillboard = () => {
    window.open(`https://zkillboard.com/system/${system.solarSystemID}/`);
  }

  const onDotlan = () => {
    window.open(`http://evemaps.dotlan.net/map/${system.regionName.replace(/\s/g, '_')}/${system.name.replace(/\s/g, '_')}#npc_delta`);
  }

  return !isNavigating && system && (
    <Paper className="system-overlay">
      <div className="header" style={{ backgroundImage: `url(${background})` }} />
      <div className="details">
        <div className="names">
          <Typography variant='h6'>
            {system.name}
          </Typography>
          <Typography variant='subtitle1' className="regions">
            {`${system.constellationName} - ${system.regionName}`}
          </Typography>
        </div>

        <div className="security">
          <Typography variant='body1'>
            {system.security.toFixed(1)}
          </Typography>
        </div>
      </div>
      <Divider />
      <div className="actions">
        <Fab variant="circular" size="small" color="primary" onClick={onNavigate}>
          <Directions />
        </Fab>
        <Fab className="zkill" variant="circular" size="small" onClick={onZKillboard}>
          <Zkillboard />
        </Fab>
        <Fab variant="circular" size="small" onClick={onDotlan}>
          <Dotlan />
        </Fab>
      </div>
      <div className="information">
        <SystemNeighbors />
        <SystemStatistics />
      </div>
    </Paper>
  )
}


export default SystemOverlay;
