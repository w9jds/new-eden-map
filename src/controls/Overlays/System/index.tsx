import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Divider, Fab, Paper, Typography } from '@mui/material';
import { Directions } from '@mui/icons-material';

import Zkillboard from 'assets/zkill-logo.svg';
import Dotlan from 'assets/dotlan-logo.svg';
import background from 'assets/overlay-header.jpg';

import { getCurrentSystem } from 'store/current/selectors';

import './index.scss';

type Props = {};

const SystemOverlay: FC<Props> = () => {
  const system = useSelector(getCurrentSystem);

  const onZKillboard = () => {
    window.open(`https://zkillboard.com/system/${system.solarSystemID}`);
  }

  const onDotlan = () => {
    window.open(`http://evemaps.dotlan.net/map/${system.regionName.replace(/\s/g, '_')}/${system.name.replace(/\s/g, '_')}#npc_delta`);
  }

  return system && (
    <Paper className="system-overlay">
      <div className="header" style={{ backgroundImage: `url(${background})` }} />
      <div className="details">
        <div className="names">
          <Typography variant='h4'>
            {system.name}
          </Typography>
          <Typography variant='h6' className="regions">
            {`${system.constellationName} - ${system.regionName}`}
          </Typography>
        </div>

        <div className="security">
          <Typography variant='h5'>
            {system.security.toFixed(1)}
          </Typography>
        </div>
      </div>
      <Divider />
      <div className="actions">
        <Fab variant="circular" size="small" color="primary">
          <Directions />
        </Fab>
        <Fab className="zkill" variant="circular" size="small" onClick={onZKillboard}>
          <Zkillboard />
        </Fab>
        <Fab variant="circular" size="small" onClick={onDotlan}>
          <Dotlan />
        </Fab>
      </div>
      <Divider />
      <div className="kill-feed">

      </div>
    </Paper>
  )
}


export default SystemOverlay;