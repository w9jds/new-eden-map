import React, { FC, useRef, useMemo } from 'react'
import { Color, MathUtils, BufferGeometry, BufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'

import { buildAttributes, setAttributes, positionToArray } from 'utils/geometry'
import { System } from 'models/universe'

import Points from './Points'
import { useDispatch } from 'react-redux'
import { setCurrentSystem } from 'store/current/actions'

const clockWarparound = 60 * 60 * 1000
const twinkleSpeed = 0.85

type Props = {
  solarSystems: System[];
}

const Stars: FC<Props> = ({ solarSystems }) => {
  const colorMaxSec = new Color('#39b4f1');
  const dispatch = useDispatch();
  const pointsRef = useRef(null);
  const clockTime = useRef(0);

  const attributes = useMemo(() => ({
    count: solarSystems.length,
    ...buildAttributes(solarSystems.length),
  }), [solarSystems]);

  useFrame((state, delta) => {
    const { count, positions, colors, scales, systemId } = attributes;
    clockTime.current = (clockTime.current + delta) % clockWarparound;

    if (!pointsRef.current) {
      return;
    }

    for (let index = 0; index < count; index++) {
      const solarSystem = solarSystems[index];

      positionToArray(solarSystem, positions, index);

      const twikleScale = MathUtils.clamp(
        -1 + Math.sin((clockTime.current + index) * twinkleSpeed) * 2, 0, 1
      );

      new Color('#a1a1a1').lerp(
        colorMaxSec, solarSystem.security
      ).addScalar(
        twikleScale
      ).toArray(colors, index * 3)

      scales[index] = 2.0 * (solarSystem.radius / 1000000000000);
      systemId[index] = solarSystem.id;
    }

    setAttributes(pointsRef.current.geometry as BufferGeometry, positions, colors, scales);
    pointsRef.current.geometry.setAttribute('systemIds', new BufferAttribute(systemId, 1));

    state.raycaster.setFromCamera(state.mouse, state.camera);
    const intersect = state.raycaster.intersectObject(pointsRef.current);

    if (intersect.length > 0) {
      const object = intersect[0];
      const system = solarSystems[object.index];
      dispatch(setCurrentSystem(system));
    } else {
      dispatch(setCurrentSystem(null));
    }
  });

  return (
    <Points ref={pointsRef} />
  );
}

export default Stars