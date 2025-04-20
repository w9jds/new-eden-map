/* eslint-disable react/no-unknown-property */
import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getUniverse } from 'store/current/selectors';

const Connections: FC = () => {
  const details = useSelector(getUniverse);

  const connections = useMemo(() => {
    const segments = {};

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

  const { positions, stroke, count } = useMemo(() => {
    const positions = [];

    let index = 0;
    for (const systemId in connections) {
      const from = details[systemId];

      for (const destinationId of connections[systemId]) {
        const to = details[destinationId];

        positions.push(...from.position);
        index++;
        positions.push(...to.position);
        index++;
      }
    }

    return {
      count: index,
      stroke: new Float32Array(index),
      positions: new Float32Array(positions),
    }
  }, [connections]);

  return (
    <lineSegments>
      <lineBasicMaterial transparent opacity={0.13}/>
      <bufferGeometry>
        <bufferAttribute attach="attributes-lineSize" count={count} array={stroke} itemSize={1} />
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
    </lineSegments>
  );
}

export default Connections