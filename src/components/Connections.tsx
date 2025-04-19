/* eslint-disable react/no-unknown-property */
import React, { Fragment, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux';

import { systemDetails } from 'constants/systems';
import { getRoute } from 'store/navigation/selectors';
import { BufferGeometry } from 'three';

type Props = {
  connections: Record<number, number[]>;
}

const Connections = ({ connections }: Props) => {
  const route = useSelector(getRoute);
  const routeRef = useRef<BufferGeometry>(undefined);

  const { vertexs } = useMemo(() => {
    const positions = new Array(700);

    let index = 0;
    for (const systemId of route) {
      const details = systemDetails[systemId];

      if (details) {
        const { position } = details;

        positions[index] = +position[0];
        positions[index+1] = +position[1];
        positions[index+2] = +position[2];

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
    for (const systemId in connections) {
      const from = systemDetails[systemId];

      for (const destinationId of connections[systemId]) {
        const to = systemDetails[destinationId];

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
    <Fragment>
      {
        vertexs.length > 0 && (
          <line>
            <lineBasicMaterial opacity={1} transparent={false}/>
            <bufferGeometry ref={routeRef}>
              <bufferAttribute attach="attributes-position" count={route.length} array={vertexs} itemSize={3} />
            </bufferGeometry>
          </line>
        )
      }
      <lineSegments>
        <lineBasicMaterial transparent opacity={0.2}/>
        <bufferGeometry>
          <bufferAttribute attach="attributes-lineSize" count={count} array={stroke} itemSize={1} />
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
      </lineSegments>
    </Fragment>
  );
}

export default Connections