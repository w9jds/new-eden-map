import React, { useMemo } from 'react';
import { GridHelper, Matrix4, PointLight, PointLightHelper, Vector4 } from 'three';
import { useFrame } from '@react-three/fiber';
import { systems } from 'constants/systems';
import { buildAttributes } from 'utils/geometry';

const Activity = ({ solarSystems, connections }) => {

  const attributes = useMemo(() => ({
    count: solarSystems.length,
    ...buildAttributes(solarSystems.length),
  }), [solarSystems]);

  useFrame((state, delta, frame) => {
    for (let index = 0; index < solarSystems.length; index++) {
    //   const solarSystem = solarSystems[index];

    //   const pl = new PointLight(0xffffff, 15);
    //   pl.position.set(solarSystem.x, solarSystem.y, solarSystem.z);
    //   pl.color.setHSL(colors[0 * 3], colors[0 * 3 + 1], colors[0 * 3 + 2]);
    //   state.scene.add(pl);
    }
  })

  return null;

}

export default Activity;