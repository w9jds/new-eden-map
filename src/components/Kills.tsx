import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Mesh, ShaderMaterial, Vector3, Color, CircleGeometry } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { systemDetails } from 'constants/systems';
import { getKillSystems } from 'store/kills/selectors';

const shader = new ShaderMaterial({
  transparent: true,
  // side: DoubleSide,
  uniforms: {
    uTime: { value: 0.0 },
    uBaseColor: { value: new Color(0x101030) },
    uPulseColor: { value: new Color(0xff0000) },
    uPulseSpeed: { value: 3.5 },
    uPulseWidth: { value: 12 },
    uRippleSpacing: { value: 10 }
  },
  vertexShader: `
    varying highp vec3 vFragPos;
    varying highp vec3 vNormal;
    varying highp vec3 vLocalPos;

    void main() {
      vFragPos = vec3(modelMatrix * vec4(position, 1.0));
      vLocalPos = position; // 'position' IS the model space position attribute
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewMatrix * vec4(vFragPos, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    varying highp vec3 vFragPos;
    varying highp vec3 vNormal;
    varying highp vec3 vLocalPos;

    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uPulseColor;
    uniform float uPulseSpeed;
    uniform float uPulseWidth;
    uniform float uRippleSpacing;

    void main() {
      float radialDist = length(vLocalPos);
      float phase = radialDist - uTime * uPulseSpeed;
      float cyclePos = mod(phase, uRippleSpacing);

      if (cyclePos < 0.0) {
        cyclePos += uRippleSpacing;
      }

      float peakPos = uRippleSpacing / 2.0;
      float distFromPeak = abs(cyclePos - peakPos);
      float halfWidth = uPulseWidth / 2.0;
      float intensity = 1.0 - smoothstep(0.0, halfWidth, distFromPeak);
      intensity = clamp(intensity, 0.0, 1.0);

      vec3 finalColor = mix(uBaseColor, uPulseColor, intensity);
      gl_FragColor = vec4(finalColor, intensity);
    }
  `,
});

export const useKillPulses = () => {
  const pulseRef = useRef<Record<string, Mesh>>({});
  const active = useSelector(getKillSystems);
  const { camera, scene } = useThree();

  useEffect(() => {
    for (const id in pulseRef.current) {
      if (!active.includes(+id)) {
        if (pulseRef.current[id]) {
          scene.remove(pulseRef.current[id]);
          pulseRef.current[id].geometry.dispose();
          delete pulseRef.current[id];
        }
      }
    }

    for (const id of active) {
      if (!pulseRef.current[id]) {
        const { position } = systemDetails[id];
        const startPosition = new Vector3(...position);

        const material = shader.clone();
        const geometry = new CircleGeometry(12, 64);
        const pulse = new Mesh(geometry, material);

        pulse.position.copy(startPosition);
        scene.add(pulse);

        pulseRef.current[id] = pulse;
      }
    }
  }, [active]);

  useFrame((state, delta) => {
    if (pulseRef.current) {
      for (const id in pulseRef.current) {
        const pulse = pulseRef.current?.[id];
        const material = pulse?.material as ShaderMaterial;
        if (pulse) {
          pulse.lookAt(camera.position);
        }

        if (pulse && material) {
          material.uniforms.uTime.value += delta;
        }
      }
    }
  });
}
