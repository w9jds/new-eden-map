import React, { FC, useMemo } from 'react';

import './ChartTooltip.scss';

const ChartTooltip: FC<unknown> = ({ active, payload }) => {

  const mapNames = (name) => {
    switch(name) {
      case 'jumps':
        return 'Jumps';
      case 'npcKills':
        return 'NPC Kills';
      case 'podKills':
        return 'Pod Destroyed';
      case 'shipKills':
        return 'Ship Destroyed';
    }
  }

  const time = useMemo(() => {
    if (active && payload) {
      return new Date(payload[0].payload.processedAt).toLocaleString();
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