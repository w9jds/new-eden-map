import React, { FC, useRef, useMemo, useEffect } from 'react';
import { Color, MathUtils, MeshNormalMaterial, ShaderMaterial, Vector3 } from 'three';
import { useDispatch, useSelector } from 'react-redux';
import { useFrame } from '@react-three/fiber';
import { Select } from '@react-three/postprocessing';

import { getCurrentSystem } from 'store/current/selectors';
import { setCurrentSystem } from 'store/current/actions';
import { getKillSystems } from 'store/kills/selectors';
import { System } from 'models/universe';

const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec3 color;

  #define PI 3.14159265359
  #define T (uTime*25.)

  void main() {
    float disp = max( max(0., 1.-pow(3.*abs(uv.y-fract(T)+0.5),0.25)), 1.-pow(3.*abs(uv.y-fract(T)-0.5),0.25) );
    color = mix(mix(vec3(1.),uColor,0.25),uColor,disp);
    gl_Position = projectionMatrix*modelViewMatrix*vec4(position+normal*25.*disp,1.);
  }
`

const FRAGMENT_SHADER = `
  uniform float time;
  uniform vec2 resolution;

  varying vec3 color;

  #define PI 3.14159265359
  #define T (time/2.)

  void main( void ) {
    gl_FragColor = vec4( color, 0.5 );
  }
`

const uniforms = {
  uTime: { type: "f", value: 1.0 },
  uColor: { type: "c", value: new Color( 0xfe8500 ) }
};

type Props = {
  system: System;
}

const SolarSystem: FC<Props> = ({ system, ...props }) => {
  const dispatch = useDispatch();
  const activeKills = useSelector(getKillSystems);
  const target = useSelector(getCurrentSystem);
  const meshRef = useRef<any>();

  const prev = useRef(false);

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

  useEffect(() => {
    const isActive = activeKills.includes(system.solarSystemID);

    if (prev.current !== isActive) {
      if (isActive) {
        meshRef.current.material = new ShaderMaterial({
          uniforms,
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
        });
      } else {
        meshRef.current.material = new MeshNormalMaterial();
      }
    }

    prev.current = isActive;
  }, [system, activeKills])

  useFrame((state, delta) => {
    if (meshRef?.current?.material?.uniforms?.uTime) {
      meshRef.current.material.uniforms.uTime.value += (0.05 * delta) / 90;
    }
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