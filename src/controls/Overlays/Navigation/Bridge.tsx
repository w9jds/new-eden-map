import React, { FC } from 'react';
import { Stargate } from 'models/resolvers-types';

import './Bridge.scss';
import classNames from 'classnames';

type Props = {
  index: number;
  gate: Stargate;
}

const GateBridge: FC<Props> = ({ gate, index }) => {

  const start = classNames('gate-start', {
    'active': gate?.kills?.count > 0,
    'camped': gate?.kills?.isPotentialCamp,
  });

  const end = classNames('gate-end', {
    'active': gate?.destination?.kills?.count > 0,
    'camped': gate?.destination?.kills?.isPotentialCamp,
  });

  const bridge = classNames('gate', {
    'stagger-offset': (index + 1) % 2 !== 0,
    'stagger-end': (index + 1) % 2 === 0,
  });

  const onBridgeClick = e => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div className={bridge} onClick={onBridgeClick}>
      <div className={start}/>
      <div className={end}/>
    </div>
  );
}

export default GateBridge;