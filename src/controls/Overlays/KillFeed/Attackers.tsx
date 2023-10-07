import React, { FC, useMemo } from 'react';

import { Tooltip } from '@mui/material';
import { Attacker, NameRef } from 'models/killmail';

type AttackerProps = {
  data: Attacker[],
  names: Record<number, NameRef>,
}

const Attackers: FC<AttackerProps> = ({
  data,
  names,
}) => {

  const fleet = useMemo(() => {
    const ships = {};

    for (let attacker of data) {
      if (attacker.ship_type_id) {
        if (!ships[attacker.ship_type_id]) {
          ships[attacker.ship_type_id] = {
            details: {
              alt: names?.[attacker.ship_type_id]?.name || '',
              src: `https://images.evetech.net/types/${attacker.ship_type_id}/icon?size=64`
            },
            participants: 1,
          }
        } else {
          ships[attacker.ship_type_id].participants += 1;
        }
      }
    }

    return Object.keys(ships)
      .map(id => ({ id,...ships[id] }));
  }, [data]);

  return fleet?.length && (
    <div className="confrontation">
      {
        fleet.map(ship =>
          <Tooltip key={ship.id} arrow disableInteractive title={ship.details.alt} placement="top">
            <div className="attacker-ship">
              <img  {...ship.details} />
              <div className="participants-badge">
                <span>{ship.participants}</span>
              </div>
            </div>
          </Tooltip>
        )
      }
    </div>
  );
}

export default Attackers;