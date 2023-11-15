import React, { FC, useMemo } from 'react';
import { systemDetails } from 'constants/systems';
import { MenuItem, Typography } from '@mui/material';
import { getClassName } from 'utils/universe';
import { System } from 'models/universe';

type Props = {
  mini?: boolean;
  systemId: number;
  onClick?: (e, details: System) => void;
}

const SystemTile: FC<Props> = ({
  mini = false,
  systemId,
  onClick
}) => {
  const system = useMemo(() => systemDetails[systemId], [systemId]);

  const onSelect = e => {
    if (onClick) {
      onClick(e, system);
    }
  }

  return (
    <MenuItem id="system-tile" className="result" onClick={onSelect}>
      <div className="names">
        <Typography variant="body1">
          {system.name}
        </Typography>
        {
          !mini && (
            <Typography variant="caption">
              {system.regionName}
            </Typography>
          )
        }
      </div>
      <div className="security">
        <Typography variant="body2">
          {getClassName(system.wormholeClassID)}
        </Typography>
      </div>
    </MenuItem>
  );
}

export default SystemTile;