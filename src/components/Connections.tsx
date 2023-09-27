import { systems } from 'constants/systems';

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { buildAttributes, setAttributes, positionToArray } from 'utils/geometry'
import { System } from 'models/universe'

import Segments from './Segments'

const clockWarparound = 60 * 60 * 1000
const twinkleSpeed = 0.85

type Props = {
  connections: Record<number, number[]>;
}

const getColors = (clockTime, solarSystem, index) : THREE.Color => {
  const colorMaxSec = new THREE.Color('#39b4f1')

  const twikleScale = THREE.MathUtils.clamp(
    -1 + Math.sin((clockTime.current + index) * twinkleSpeed) * 2,
    0,
    1
  );

  return new THREE.Color('#a1a1a1').lerp(
    colorMaxSec, solarSystem.security
  );
}

const Connections = ({ connections }: Props) => {

  const segmentsRef = useRef(null)
  const clockTime = useRef(0)

  useFrame((_, delta) => {
    clockTime.current = (clockTime.current + delta) % clockWarparound;

    if (!segmentsRef.current) {
      return;
    }

    const count = Object.values(connections).reduce((out, current) => out += current.length * 2, 0);

    const { positions, colors } = {
      positions: new Float32Array(count * 3),
      colors: new Float32Array(count * 3),
    };

    let index = 0;

    for (let systemId in connections) {
      const from = systems[systemId];

      for (let desinationId of connections[systemId]) {
        const to = systems[desinationId];

        positionToArray(from, positions, index);
        // getColors(clockTime, from, index).toArray(colors, index * 3);
        index++;

        positionToArray(to, positions, index);
        // getColors(clockTime, to, index).toArray(colors, index * 3);
        index++;

        segmentsRef.current
      }
    }

    segmentsRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    segmentsRef.current.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    segmentsRef.current.geometry.attributes.position.needsUpdate = true;
  })

  return (
    <Segments ref={segmentsRef} />
  );
}

export default Connections