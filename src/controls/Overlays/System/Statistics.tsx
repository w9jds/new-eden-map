import React, { FC, Fragment } from 'react';

import ChartTooltip from './ChartTooltip';
import { Line, Tooltip, ResponsiveContainer, ComposedChart, XAxis, YAxis, Bar} from 'recharts';
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
        <ResponsiveContainer width={360} height={125} >
          <ComposedChart className="kills-chart" data={data}>
            <Tooltip content={<ChartTooltip />}/>
            <XAxis hide dataKey="processedAt" />
            <YAxis yAxisId="kills" hide orientation='left' />
            <YAxis yAxisId="jumps" hide orientation='right'/>

            <Bar
              yAxisId="jumps" 
              dataKey="jumps" 
              fill="#3a80ff"
              stroke='#3a80ff'
              barSize={4} 
            />

            <Line 
              yAxisId="kills" 
              type="monotone" 
              dataKey="npcKills" 
              stroke="#06e221"
              strokeWidth={3}
              dot={null} 
            />

            <Line 
              yAxisId="kills" 
              type="monotone"
              dataKey="podKills" 
              stroke="#ff4c17" 
              strokeWidth={3}
              dot={null} 
            />

            <Line 
              yAxisId="kills" 
              type="monotone" 
              dataKey="shipKills" 
              stroke="#ffb80d" 
              strokeWidth={3}
              dot={null} 
            />
          </ComposedChart>
        </ResponsiveContainer>

      </div>
    </Fragment>
  );
}

export default SystemStatistics;