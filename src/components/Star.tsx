import React, { FC, useRef, useMemo } from 'react';
import { BufferAttribute, BufferGeometry, Color, MathUtils, Mesh, TextureLoader, Vector3 } from 'three';
import { useSelector } from 'react-redux';

import { System } from 'models/universe';

import glow from 'textures/glow.png';
import { getCurrentSystem } from 'store/current/selectors';
import { useFrame } from '@react-three/fiber';

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
  const target = useSelector(getCurrentSystem);
  const meshRef = useRef<any>();

  const { position, radius } = useMemo(() => ({
    radius: MathUtils.clamp(system.radius / 1999900000000, 1, 5),
    position: new Vector3(
      +system.position[0] / 1000000000000000,
      +system.position[1] / 1000000000000000,
      +system.position[2] / 1000000000000000,
    ),
  }), [system]);

  useFrame((state) => {
    const color = new Float32Array(3);
    const geometry = meshRef.current.geometry as BufferGeometry;

    if (target?.solarSystemID === system.solarSystemID) {


      new Color('#a1a1a1')
        .lerp(new Color('#39b4f1'), system.security)
        .toArray(color);

      geometry.setAttribute('color', new BufferAttribute(color, 3));
    }
  });

  return (
    <mesh ref={meshRef} position={position} {...props} >
      <sphereGeometry args={[radius, 15, 15]} />
      <meshNormalMaterial/>
    </mesh>
  );
}

export default SolarSystem;