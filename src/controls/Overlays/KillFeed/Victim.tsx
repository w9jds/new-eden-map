import React, { DetailedHTMLProps, FC } from 'react';

import { Tooltip } from '@mui/material';
import { NameRef, Victim } from 'models/killmail';

type VictimProps = {
  img: DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  data: Victim;
  names: Record<number, NameRef>;
}

const Victim: FC<VictimProps> = ({ data, img, names }) => {
  const onPortraitLoadError = (e) => {
    e.target.src = 'https://images.evetech.net/characters/1/portrait?size=64';
  }

  return (
    <div className="images">
      <img
        className="ship-lost"
        alt={names?.[data.ship_type_id]?.name || ''}
        src={`https://images.evetech.net/types/${data.ship_type_id}/render?size=128`}
      />

      <div className="victim-info">
        {
          data?.character_id &&
            <Tooltip arrow disableInteractive title={names?.[data.character_id]?.name || ''} placement="top">
              <img className="portrait"
                onError={onPortraitLoadError}
                src={`https://images.evetech.net/characters/${data.character_id}/portrait?size=64`}
              />
            </Tooltip>
        }
        <Tooltip arrow disableInteractive title={img.alt} placement="top">
          <img className="affiliation" {...img}/>
        </Tooltip>
      </div>
    </div>
  );
}

export default Victim;