import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import ChartTooltip from './ChartTooltip';
import { LineChart, Line, Tooltip, ResponsiveContainer} from 'recharts';
import { Divider, Typography } from '@mui/material';

import { getStatisticData } from 'store/current/selectors';

const SystemStatistics = () => {
  const data = useSelector(getStatisticData);

  return data && (
    <Fragment>
      <Divider />
      <div className='system-statistics'>
        <Typography variant="h6">Hourly Activity</Typography>
        <ResponsiveContainer width={352} height={125} >
          <LineChart className="kills-chart"  data={data}>
            <Tooltip content={<ChartTooltip />}/>

            <Line type="monotone" dataKey="jumps" stroke="#3a80ff" dot={null} />
            <Line type="monotone" dataKey="npc_kills" stroke="#06e221" dot={null} />
            <Line type="monotone" dataKey="pod_kills" stroke="#ff4c17" dot={null} />
            <Line type="monotone" dataKey="ship_kills" stroke="#ffb80d" dot={null} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}

export default SystemStatistics;