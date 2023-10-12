import { useFrame } from '@react-three/fiber';
import React, { Fragment, useMemo, useRef } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';

import { systemDetails } from 'constants/systems';


const PULSE_FRAGMENT = `
  uniform vec2 u_mouse;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy;

    gl_FragColor = vec4(1., 0., 0., 1.);
  }
`

const uniform = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new Vector2() },
}

const Pulse = ({ id }) => {
  const meshRef = useRef<Mesh>();

  const { position } = useMemo(() => {
    const  { position } = systemDetails[id];
    const coord = new Vector3(
      position[0] / 1000000000000000,
      position[1] / 1000000000000000,
      position[2] / 1000000000000000
    );

    return {
      position: coord,
    }
  }, [id]);

  useFrame((state, delta) => {
    // const material = meshRef.current.material as ShaderMaterial;

    // if (material && id) {
    //   material.uniforms.u_time.value += state.clock.getDelta();
    // }
  })

  return id && (
    <Fragment>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[6, 25, 25]} />
        <shaderMaterial
          uniforms={uniform}
          fragmentShader={PULSE_FRAGMENT}
        />
      </mesh>
    </Fragment>
  );
}

export default Pulse;