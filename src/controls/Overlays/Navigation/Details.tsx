import React, { FC } from 'react';
import { Stargate } from 'models/resolvers-types';

import { Divider } from '@mui/material';

import './Details.scss';

type Props = {
  bridge: Stargate;
}

const DetailsTooltip: FC<Props> = ({ bridge }) => {
  return (
    <div className="details-tooltip">
      <span className="name">{bridge.name}</span>
      <div className="details">
        <span>{`Kills: ${bridge.kills.count}`}</span>
        {bridge.kills.isPotentialCamp &&
          <span className="camped">Camped</span>
        }
      </div>

      <Divider />

      <span className="name">{bridge.destination.name}</span>
      <div className="details">
        <span>{`Kills: ${bridge.destination.kills.count}`}</span>
        {bridge.destination.kills.isPotentialCamp &&
          <span className="camped">Camped</span>
        }
      </div>
    </div>
  );
}

export default DetailsTooltip;
