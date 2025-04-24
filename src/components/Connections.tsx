/* eslint-disable react/no-unknown-property */
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getUniverse } from 'store/current/selectors';
import { Color } from 'three';

const Connections: FC = () => {
  const details = useSelector(getUniverse);

  const segments = useMemo(() => {
    const segments: Record<number, number[]> = {};

    for (const id in details) {
      const system = details[id];

      if (system.neighbors) {
        for (const destination of system.neighbors) {
          if (!segments[destination] || !segments[destination].includes(system.solarSystemID)) {
            if (!segments[system.solarSystemID]) {
              segments[system.solarSystemID] = [destination];
            } else {
              segments[system.solarSystemID].push(destination);
            }
          }
        }
      }
    }

    return segments;
  }, [details]);

  const {count, positions} = useMemo(() => {
    const positions = [];

    for (const systemId in segments) {
      const from = details[systemId];

      for (const destinationId of segments[systemId]) {
        const to = details[destinationId];

        positions.push(...from.position);
        positions.push(...to.position);
      }
    }

    return {
      count: positions.length / 3,
      positions: new Float32Array(positions),
    };
  }, [segments]);

  return (
    <lineSegments>
      <lineBasicMaterial transparent opacity={0.13} linewidth={1} color={new Color(0xffffff)}/>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
    </lineSegments>
  );
}

export default Connections