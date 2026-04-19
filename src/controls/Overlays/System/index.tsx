import React, { FC, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client/react';

import { LoadingSection } from 'controls/LoadingSection';
import { Divider, Fab, Paper, Typography } from '@mui/material';
import { Directions } from '@mui/icons-material';
import SystemStatistics from './Statistics';
import SystemNeighbors from './Neighbors';

import Zkillboard from 'assets/zkill-logo.svg';
import Dotlan from 'assets/dotlan-logo.svg';
import background from 'assets/overlay-header.jpg';

import { DetailsQuery, DetailsResponse } from 'queries/System';
import { isNavOpen } from 'store/navigation/selectors';
import { getCurrentSystem } from 'store/current/selectors';
import { toggleNav } from 'store/navigation/reducer';

import './index.scss';

const SystemOverlay: FC = () => {
  const dispatch = useDispatch();
  const system = useSelector(getCurrentSystem);
  const isNavigating = useSelector(isNavOpen);
  const prev = useRef(null);

  const [getDetails, { loading, data }] = useLazyQuery<DetailsResponse, { ids: number[] }>(DetailsQuery);

  useEffect(() => {
    if (system && system.solarSystemID !== prev.current) {
      getDetails({ 
        variables: { 
          ids: [system?.solarSystemID] 
        }
      });
    }

    prev.current = system?.solarSystemID;
  }, [system]);

  const onNavigate = () => {
    dispatch(toggleNav({
      state: true,
      defaultId: system.solarSystemID
    }));
  }

  const onZKillboard = () => {
    window.open(`https://zkillboard.com/system/${system.solarSystemID}/`);
  }

  const onDotlan = () => {
    window.open(`http://evemaps.dotlan.net/map/${system.regionName.replace(/\s/g, '_')}/${system.name.replace(/\s/g, '_')}#npc_delta`);
  }

  const contents = useMemo(() => {
    const details = data?.systems?.[0];

    if (!system) {
      return null;
    }

    if (loading || !data) {
      return <LoadingSection />;
    }

    return (
      <div className="information">
        <SystemNeighbors stargates={details.stargates} />
        <SystemStatistics data={[...details.statistics].reverse()} />
      </div>
    );
  }, [loading, data])

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
      { contents }
    </Paper>
  )
}


export default SystemOverlay;
