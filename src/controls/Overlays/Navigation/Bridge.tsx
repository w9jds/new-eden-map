import React, { FC, useMemo } from 'react';
import { Stargate } from 'models/resolvers-types';
import cn from 'classnames';

import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import Details from './Details';

import './Bridge.scss';

type Props = {
  index: number;
  gate: Stargate;
}

const GateBridge: FC<Props> = ({ gate, index }) => {
  const visible = useMemo(
    () => gate?.kills?.count !== 0 || gate?.destination?.kills?.count !== 0,
    [gate]
  );

  const start = cn('gate-start', {
    'active': gate?.kills?.count > 0,
    'camped': gate?.kills?.isPotentialCamp,
  });

  const end = cn('gate-end', {
    'active': gate?.destination?.kills?.count > 0,
    'camped': gate?.destination?.kills?.isPotentialCamp,
  });

  const bridge = cn('gate', {
    'stagger-offset': (index + 1) % 2 !== 0,
    'stagger-end': (index + 1) % 2 === 0,
  });

  const onBridgeClick = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  const PaperTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip describeChild {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#222',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#222',
      maxWidth: 220,
    },
  }));

  return visible && (
    <PaperTooltip arrow title={<Details bridge={gate} />} placement="right">
      <div className={bridge} onClick={onBridgeClick}>
        <div className={start}/>
        <div className={end}/>
      </div>
    </PaperTooltip>
  );
}

export default GateBridge;
