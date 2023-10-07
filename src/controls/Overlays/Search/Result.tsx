import React, { FC, useMemo } from 'react';
import { systemDetails } from 'constants/systems';
import { Typography } from '@mui/material';
import { getClassName } from 'utils/universe';
import { System } from 'models/universe';

type Props = {
  mini?: boolean;
  systemId: number;
  onClick?: (details: System) => void;
}

const Result: FC<Props> = ({
  mini = false,
  systemId,
  onClick
}) => {
  const system = useMemo(() => systemDetails[systemId], [systemId]);

  const onSelect = () => {
    if (onClick) {
      onClick(system);
    }
  }

  return (
    <div className="result" onClick={onSelect}>
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
    </div>
  );
}

export default Result;