/* eslint-disable react/no-unknown-property */
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BufferGeometry, Color } from 'three';

import { getUniverse } from 'store/current/selectors';
import { getRoute } from 'store/navigation/selectors';

const Route = () => {
  const routeRef = useRef<BufferGeometry>(undefined);
  
  const route = useSelector(getRoute);
  const details = useSelector(getUniverse);

  const { count, points } = useMemo(() => {
    const positions = new Array(700);

    let count = 0;
    for (let i = 0; i < route.length; i++) {
      const { position } = details[route[i]];

      let index = count * 3;
      positions[index] = position[0];
      positions[index + 1] = position[1];
      positions[index + 2] = position[2];
      count++;

      if (i !== 0 && i !== route.length - 1) {
        index = count * 3;
        positions[index] = position[0];
        positions[index + 1] = position[1];
        positions[index + 2] = position[2];
        count++;
      }
    }

    if (routeRef.current) {
      routeRef.current.attributes.position.needsUpdate = true;
    }

    return {
      count,
      points: new Float32Array(positions),
    }
  }, [route]);

  return points?.length && (
    <lineSegments frustumCulled={false}>
      <lineBasicMaterial transparent opacity={0.6} color={new Color(0xffffff)} />
      <bufferGeometry ref={routeRef}>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
    </lineSegments>
  );
}

export default Route;