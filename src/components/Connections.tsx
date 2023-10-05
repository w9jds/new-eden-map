import React, { FC, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber'
import { MathUtils, Color, Float32BufferAttribute, BufferGeometry, Line3 } from 'three'

import { systemDetails } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';
import { positionToArray } from 'utils/geometry'

import Segments from './Segments'

const clockWarparound = 60 * 60 * 1000
const twinkleSpeed = 0.85

type Props = {
  connections: Record<number, number[]>;
}

const getColors = (clockTime, solarSystem, index) : THREE.Color => {
  const colorMaxSec = new Color('#39b4f1')

  const twikleScale = MathUtils.clamp(
    -1 + Math.sin((clockTime.current + index) * twinkleSpeed) * 2,
    0,
    1
  );

  return new Color('#a1a1a1').lerp(
    colorMaxSec, solarSystem.security
  );
}

type StargateProps = {
  originId: number;
  neighbors: number[];
}

const Connections = ({ connections }: Props) => {
  const current = useSelector(getCurrentSystem);
  const segmentsRef = useRef(null)
  const clockTime = useRef(0)

  useEffect(() => {
    const count = Object.values(connections)
      .reduce((out, current) => out += current.length * 2, 0);

    const { positions, colors, size } = {
      positions: new Float32Array(count * 3),
      colors: new Float32Array(count * 3),
      size: new Float32Array(count),
    };

    let index = 0;
    for (let systemId in connections) {
      const from = systemDetails[systemId];

      for (let destinationId of connections[systemId]) {
        const to = systemDetails[destinationId];

        positionToArray(from, positions, index);
        getColors(clockTime, from, index).toArray(colors, index * 3);
        index++;

        positionToArray(to, positions, index);
        getColors(clockTime, to, index).toArray(colors, index * 3);
        index++;

        if (destinationId == current?.solarSystemID || +systemId == current?.solarSystemID) {
          size[index] = 3;
        } else {
          size[index] = 1;
        }
      }
    }

    const geometry = segmentsRef.current.geometry as BufferGeometry;
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('lineSize', new Float32BufferAttribute(size, 1))
  }, [connections])

  useFrame((state, delta) => {

  })

  return (
    <Segments ref={segmentsRef} />
  );
}

export default Connections