import React, { FC, useRef, useMemo } from 'react';
import { BufferAttribute, BufferGeometry, Color, MathUtils, TextureLoader, Vector3 } from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber';
import { Select } from '@react-three/postprocessing';

import glow from 'textures/glow.png';
import { System } from 'models/universe';
import { getCurrentSystem } from 'store/current/selectors';
import { setCurrentSystem } from 'store/current/actions';

const VERTEX_SHADER = `
  attribute float size;
  attribute vec3 flareColor;
  varying vec3 vColor;

  void main() {
    vColor = flareColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(color * vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  }
`

const flareTexture = new TextureLoader().load(glow)

const uniforms = {
  color: { value: new Color() },
  pointTexture: { value: flareTexture }
}

type Props = {
  system: System;
}

const SolarSystem: FC<Props> = ({ system, ...props }) => {
  const dispatch = useDispatch();
  const target = useSelector(getCurrentSystem);
  const meshRef = useRef<any>();

  const { position, radius } = useMemo(() => ({
    radius: MathUtils.clamp(system.radius / 3500000000000, 0.7, 5),
    position: new Vector3(
      +system.position[0] / 1000000000000000,
      +system.position[1] / 1000000000000000,
      +system.position[2] / 1000000000000000,
    ),
  }), [system]);

  const focused = useMemo(() =>
    target?.solarSystemID === system.solarSystemID,
    [target]
  );

  const onSelect = () => {
    dispatch(setCurrentSystem(system));
  }

  useFrame(() => {

  });

  return (
    <Select enabled={focused}>
      <mesh ref={meshRef} position={position} onClick={onSelect} {...props} >
        <sphereGeometry args={[radius, 15, 15]} />
        <meshNormalMaterial/>
      </mesh>
    </Select>
  );
}

export default SolarSystem;