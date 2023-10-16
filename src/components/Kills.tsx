import { useFrame } from '@react-three/fiber';
import React, { Fragment, useMemo, useRef } from 'react';
import { Mesh, ShaderMaterial, Vector2, Vector3 } from 'three';

import { systemDetails } from 'constants/systems';

const PULSE_VERTEX = `
  varying vec2 screenPosition;

  void main() {
    vec4 mvPosition = vec4(position, 1.0);
    screenPosition = mvPosition;
    gl_Position = mvPosition;
  }
`

const PULSE_FRAGMENT = `
  varying vec2 screenPosition;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy;
    vec2 center = screenPosition;

    float d = distance(uv, center);
    float r = sin(fract(u_time));

    float alpha = smoothstep(d - (r * 250.), d + (r * 200.), 0.);
    gl_FragColor = vec4(1., 0., 0., alpha);
  }
`

//     vec2 uv = gl_FragCoord.xy;
//     vec2 center = u_resolution * 0.5;
//     float d = distance(uv, center);

//     float alpha = smoothstep(d - (u_resolution.x / 1.75), d - 1., 0.);
//     gl_FragColor = vec4(u_color, alpha);

const uniform = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: {
    type: "v2",
    value: new Vector2(window.innerWidth, window.innerHeight)
  },
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
    const material = meshRef.current.material as ShaderMaterial;

    if (material && id) {
      material.uniforms.u_time.value += state.clock.getDelta();
    }
  })

  return id && (
    <Fragment>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[6, 25, 25]} />
        <shaderMaterial
          transparent
          depthFunc={1}
          uniforms={uniform}
          vertexShader={PULSE_VERTEX}
          fragmentShader={PULSE_FRAGMENT}
        />
      </mesh>
    </Fragment>
  );
}

export default Pulse;