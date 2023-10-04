import React, { FC, useRef, useMemo } from 'react'
import { Color, MathUtils, BufferGeometry, BufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'

import { systemIds } from 'constants/systems'
import { buildAttributes, setAttributes, positionToArray } from 'utils/geometry'
import { System } from 'models/universe'

import Star from './Star';
import { useSelector } from 'react-redux'
import { getCurrentSystem } from 'store/current/selectors'

const clockWarparound = 60 * 60 * 1000
const twinkleSpeed = 0.85

type Props = {
  systems: System[];
}

const colorMaxSec = new Color('#39b4f1');
const Stars: FC<Props> = ({ systems }) => {
  const current = useSelector(getCurrentSystem);
  const pointsRef = useRef(null);
  const clockTime = useRef(0);

  const attributes = useMemo(() => ({
    count: systems.length,
    ...buildAttributes(systems.length),
  }), [systems]);

  useFrame((state, delta) => {
    const { count, positions, colors, scales } = attributes;
    clockTime.current = (clockTime.current + delta) % clockWarparound;

    if (!pointsRef.current) {
      return;
    }

    for (let index = 0; index < count; index++) {
      const solarSystem = systems[index];

      positionToArray(solarSystem, positions, index);

      const twikleScale = MathUtils.clamp(
        -1 + Math.sin((clockTime.current + index) * twinkleSpeed) * 2, 0, 1
      );

      new Color('#a1a1a1').lerp(
        colorMaxSec,
        solarSystem.security
      ).addScalar(
        twikleScale
      ).toArray(colors, index * 3)

      if (current?.solarSystemID === solarSystem.solarSystemID) {
        scales[index] = 6.0 * (solarSystem.radius / 1000000000000);
      } else {
        scales[index] = 2.0 * (solarSystem.radius / 1000000000000);
      }
    }

    setAttributes(pointsRef.current.geometry as BufferGeometry, positions, colors, scales);
  });

  return (
    <Star ref={pointsRef} />
  );
}

export default Stars