import React, { Fragment, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber'

import { systemDetails } from 'constants/systems';
import { getRoute } from 'store/navigation/selectors';
import { BufferGeometry } from 'three';

type Props = {
  connections: Record<number, number[]>;
}

const Connections = ({ connections }: Props) => {
  const route = useSelector(getRoute);
  const routeRef = useRef<BufferGeometry>();

  const { vertexs } = useMemo(() => {
    const positions = new Array(700);

    let index = 0;
    for (let systemId of route) {
      const details = systemDetails[systemId];

      if (details) {
        const { position } = details;

        positions[index] = +position[0] / 1000000000000000;
        positions[index+1] = +position[1] / 1000000000000000;
        positions[index+2] = +position[2] / 1000000000000000;

        index += 3;
      }
    }

    if (routeRef.current) {
      routeRef.current.attributes.position.needsUpdate = true;
    }

    return {
      vertexs: new Float32Array(positions),
    }
  }, [route]);

  const { positions, stroke, count } = useMemo(() => {
    const positions = [];

    let index = 0;
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
    <Fragment>
      {
        vertexs.length > 0 && (
          <line>
            <bufferGeometry ref={routeRef}>
              <bufferAttribute attach="attributes-position" count={route.length} array={vertexs} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial
              opacity={1}
            />
          </line>
        )
      }
      <lineSegments >
        <bufferGeometry>
          <bufferAttribute attach="attributes-lineSize" count={count} array={stroke} itemSize={1} />
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          opacity={0.2}
          transparent={true}
        />
      </lineSegments>
    </Fragment>
  );
}

export default Connections