/* eslint-disable react/no-unknown-property */
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BufferGeometry, Color, ShaderMaterial } from 'three';

import { getUniverse } from 'store/current/selectors';
import { getRoute } from 'store/navigation/selectors';
import { useFrame } from '@react-three/fiber';

const uniforms = {
  uTime: { value: 0.0 },
  uColor: { value: new Color('#00ffaa') }, // Aqua-green color
  uFrequency: { value: 15.0 }, // Increase for more waves along the line
  uSpeed: { value: 0.2 }, // Adjust speed of the flow
  uAmplitude: { value: 0.7 }, // Variation in alpha (max alpha = base + amp)
  uBaseAlpha: { value: 0.15 }, // Base visibility of the line (dim)
}

const vertexShader = `
  attribute float distance;
  varying float vDistance;

  void main() {
      vDistance = distance;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;      // Color of the flowing substance/pipe
  uniform float uFrequency; // How many waves along the length
  uniform float uSpeed;     // How fast the waves move
  uniform float uAmplitude; // How much the alpha varies
  uniform float uBaseAlpha; // Minimum alpha (visibility) of the pipe

  varying float vDistance; // Normalized distance (0.0 to 1.0)

  void main() {
    // Calculate a sine wave based on distance and time
    // Multiplying distance by frequency creates spatial waves
    // Adding time*speed makes the waves move along the distance axis
    float wave = sin(vDistance * uFrequency - uTime * uSpeed); // Use '-' for direction

    // Map the wave from [-1, 1] range to [0, 1] range
    float intensity = (wave + 1.0) / 2.0; // intensity is 0.0 at troughs, 1.0 at peaks

    // Modulate the alpha based on the intensity and uniforms
    // Base alpha defines the minimum visibility
    // Amplitude defines how much brighter/more opaque the wave peaks get
    float finalAlpha = uBaseAlpha + intensity * uAmplitude;

    // Clamp alpha to valid range [0.0, 1.0]
    finalAlpha = clamp(finalAlpha, 0.0, 1.0);

    // Optional: Discard fully transparent fragments
    // if (finalAlpha < 0.01) {
    //     discard;
    // }

    // Set the final color and calculated alpha
    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;


const Route = () => {
  const routeRef = useRef<BufferGeometry>(undefined);
  const shaderRef = useRef<ShaderMaterial>(undefined);
  
  const route = useSelector(getRoute);
  const details = useSelector(getUniverse);

  const { count, points } = useMemo(() => {
    const positions = new Array(700);

    let count = 0;
    for (let i = 0; i < route.length; i++) {
      const { position } = details[route[i]];

      let index = count * 3;
      positions[index] = position[0];
      positions[index + 1] = position[1];
      positions[index + 2] = position[2];
      count++;

      if (i !== 0 && i !== route.length - 1) {
        index = count * 3;
        positions[index] = position[0];
        positions[index + 1] = position[1];
        positions[index + 2] = position[2];
        count++;
      }
    }

    if (routeRef.current) {
      routeRef.current.attributes.position.needsUpdate = true;
    }

    return {
      count,
      points: new Float32Array(positions),
    }
  }, [route]);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
    }
  })

  return points?.length && (
    <lineSegments frustumCulled={false}>
      {/* <shaderMaterial ref={shaderRef}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // blending={NormalBlending}
        // depthWrite={false}
      /> */}
      <lineBasicMaterial transparent opacity={0.6} color={new Color(0xffffff)} />
      <bufferGeometry ref={routeRef}>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
    </lineSegments>
  );
}

export default Route;