import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Mesh, ShaderMaterial, Vector3, Color, CircleGeometry, NormalBlending } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import { systemDetails } from 'constants/systems';
import { getKillSystems } from 'store/kills/selectors';

const shader = new ShaderMaterial({
  transparent: true,
  blending: NormalBlending,
  uniforms: {
    u_time: { value: 0.0 },
    u_base_color: { value: new Color(0x101030) },
    u_color: { value: new Color(0xff0000) },
    u_speed: { value: 3.5 },
    u_width: { value: 12 },
    u_spacing: { value: 10 }
  },
  vertexShader: `
    varying highp vec3 vFragPos;
    varying highp vec3 vNormal;
    varying highp vec3 vLocalPos;

    void main() {
      vFragPos = vec3(modelMatrix * vec4(position, 1.0));
      vLocalPos = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * viewMatrix * vec4(vFragPos, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    varying highp vec3 vFragPos;
    varying highp vec3 vNormal;
    varying highp vec3 vLocalPos;

    uniform float u_time;
    uniform vec3 u_base_color;
    uniform vec3 u_color;
    uniform float u_speed;
    uniform float u_width;
    uniform float u_spacing;

    void main() {
      float radialDist = length(vLocalPos);
      float phase = radialDist - u_time * u_speed;
      float cyclePos = mod(phase, u_spacing);

      if (cyclePos < 0.0) {
        cyclePos += u_spacing;
      }

      float peakPos = u_spacing / 2.0;
      float distFromPeak = abs(cyclePos - peakPos);
      float halfWidth = u_width / 2.0;
      float rippleIntensity = 1.0 - smoothstep(0.0, halfWidth, distFromPeak);
      rippleIntensity = clamp(rippleIntensity, 0.0, 1.0);

      float fadeStartRadius = 12. - 3.;
      float edgeFade = 1.0 - smoothstep(fadeStartRadius, 12., radialDist);
      edgeFade = clamp(edgeFade, 0.0, 1.0);

      vec3 finalColor = mix(u_base_color, u_color, rippleIntensity);
      float finalAlpha = rippleIntensity * edgeFade;

      gl_FragColor = vec4(finalColor, finalAlpha);
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

        pulse.renderOrder = 0;
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
          material.uniforms.u_time.value += delta;
        }
      }
    }
  });
}
