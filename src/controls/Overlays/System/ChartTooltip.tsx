import React, { FC, useMemo } from 'react';

import './ChartTooltip.scss';

const ChartTooltip: FC<any> = ({ active, payload }) => {

  const mapNames = (name) => {
    switch(name) {
      case 'jumps':
        return 'Jumps';
      case 'npc_kills':
        return 'NPC Kills';
      case 'pod_kills':
        return 'Pod Destroyed';
      case 'ship_kills':
        return 'Ship Destroyed';
    }
  }

  const time = useMemo(() => {
    if (active && payload) {
      return new Date(payload[0].payload.timestamp).toLocaleString();
    }
  }, [payload]);

  return active && payload && (
    <div className="activity-tooltip">
      <span>{ time }</span>

      <div className="fields">
        { 
          payload.map(item => (
            <div key={item.name} className="field">
              <svg height="18" width="18">
                <circle r="6" cx="9" cy="9" fill={item.stroke} />  
              </svg>
              <span className="name">{`${mapNames(item.name)}: ${item.value}`}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ChartTooltip;