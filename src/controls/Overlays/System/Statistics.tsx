import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { onValue, ref } from 'firebase/database';

import { Statistics } from 'models/universe';
import { getCurrentSystem, getFbDatabase } from 'store/current/selectors';
import { Divider, Typography } from '@mui/material';

const SystemStatistics = () => {
  const target = useSelector(getCurrentSystem);
  const database = useSelector(getFbDatabase);
  const [stats, setStats] = useState<Statistics>();

  useEffect(() => {
    setStats(null);

    onValue(
      ref(database, `universe/systems/k_space/${target.solarSystemID}/statistics`),
      (snapshot) => setStats(snapshot.val()),
    );

    return () => setStats(null);
  }, [target]);

  return stats && (
    <Fragment>
      <Divider />
      <div className='system-statistics'>
        <Typography variant="h4">Hourly Activity</Typography>
        <div>
          <div>
            <Typography variant="h5"> {`${stats?.jumps || 0} Jumps`} </Typography>
            <Typography variant="h5"> {`${stats?.kills?.shipKills || 0} Ship Kills`} </Typography>
          </div>
          <div>
            <Typography variant="h5"> {`${stats?.kills?.podKills || 0} Pod Kills`} </Typography>
            <Typography variant="h5"> {`${stats?.kills?.npcKills || 0} NPC Kills`} </Typography>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SystemStatistics;