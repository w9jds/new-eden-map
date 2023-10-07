import React, { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber'
import { Float32BufferAttribute, BufferGeometry, Line3 } from 'three'

import { systemDetails } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';
import { positionToArray } from 'utils/geometry'

type Props = {
  connections: Record<number, number[]>;
}

const Connections = ({ connections }: Props) => {
  const current = useSelector(getCurrentSystem);
  const segmentsRef = useRef(null);

  const { positions, stroke, count } = useMemo(() => {
    const positions = [], stroke = [];

    let index = 0, count = 0;
    for (let systemId in connections) {
      const from = systemDetails[systemId];

      for (let destinationId of connections[systemId]) {
        const to = systemDetails[destinationId];

        positions.push(
          +from.position[0] / 1000000000000000,
          +from.position[1] / 1000000000000000,
          +from.position[2] / 1000000000000000,
        );

        index++;

        positions.push(
          +to.position[0] / 1000000000000000,
          +to.position[1] / 1000000000000000,
          +to.position[2] / 1000000000000000,
        );

        index++;
      }
    }

    return {
      count: index,
      stroke: new Float32Array(index),
      positions: new Float32Array(positions),
    }
  }, [connections]);

  useFrame((state, delta) => {

  })

  return (
    <lineSegments ref={segmentsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-lineSize" count={count} array={stroke} itemSize={1} />
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        opacity={0.2}
        transparent={true}
      />
    </lineSegments>
  );
}

export default Connections