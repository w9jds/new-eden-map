import React, { Fragment, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Mesh, Points, ShaderMaterial, Vector2, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

import { systemDetails } from 'constants/systems';
import { getKillSystems } from 'store/kills/selectors';

const PULSE_VERTEX = `
  #include <common>

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`

const PULSE_FRAGMENT = `
  varying vec2 vUv;

  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy * vUv;
    vec2 center = u_resolution * 0.5;

    float d = distance(uv, center);
    float r = sin(fract(u_time));

    float alpha = smoothstep(d - (r * 250.), d + (r * 200.), 0.);
    gl_FragColor = vec4(1., 0., 0., 1.);
  }
`

const uniform = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: {
    type: "v2",
    value: new Vector2(
      window.innerWidth,
      window.innerHeight
    )
  },
}

const Pulses = () => {
  const meshRef = useRef<Mesh>();
  const active = useSelector(getKillSystems);

  const { positions } = useMemo(() => {
    const positions = [];

    for (let i = 0; i < active.length; i++) {
      const { position } = systemDetails[active[i]];

      positions.push(
        position[0] / 1000000000000000,
        position[1] / 1000000000000000,
        position[2] / 1000000000000000
      );
    }

    return {
      positions: new Float32Array(positions),
    }
  }, [active]);

  useFrame((state, delta) => {
    const material = meshRef.current.material as ShaderMaterial;

    if (material && active) {
      material.uniforms.u_time.value += state.clock.getDelta();
    }
  })

  return active && (
    <Fragment>
      <mesh ref={meshRef}>
        <sphereGeometry attach="geometry" args={[6, 25, 25]}>
          <bufferAttribute attach="attributes-position" count={active.length} array={positions} itemSize={3} />
        </sphereGeometry>

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

export default Pulses;