import React, { FC, Fragment } from 'react';

import ChartTooltip from './ChartTooltip';
import { LineChart, Line, Tooltip, ResponsiveContainer} from 'recharts';
import { Divider, Typography } from '@mui/material';

import { HourlyStatistic } from 'models/resolvers-types';

type Props = {
  data?: HourlyStatistic[]
}

const SystemStatistics: FC<Props> = ({
  data = []
}) => {

  return !!data?.length && (
    <Fragment>
      <Divider />
      <div className='system-statistics'>
        <Typography variant="h6">Hourly Activity</Typography>
        <ResponsiveContainer width={352} height={125} >
          <LineChart className="kills-chart" data={data}>
            <Tooltip content={<ChartTooltip />}/>

            <Line type="monotone" dataKey="jumps" stroke="#3a80ff" dot={null} />
            <Line type="monotone" dataKey="npcKills" stroke="#06e221" dot={null} />
            <Line type="monotone" dataKey="podKills" stroke="#ff4c17" dot={null} />
            <Line type="monotone" dataKey="shipKills" stroke="#ffb80d" dot={null} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}

export default SystemStatistics;