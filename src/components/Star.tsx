// import React, { FC, useRef, useMemo, useEffect } from 'react';
// import { Color, Group, MathUtils, Mesh, Object3DEventMap, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from 'three';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFrame } from '@react-three/fiber';

// import { getCurrentSystem } from 'store/current/selectors';
// import { setCurrentSystem } from 'store/current/actions';
// import { getKillSystems } from 'store/kills/selectors';
// import { getSecurityColor } from 'utils/geometry';
// import { System } from 'models/universe';

// const twinkleSpeed = 0.85;
// const clockWarparound = 60 * 60 * 1000;

// const PULSE_FRAGMENT = `
//   uniform vec2 u_resolution;
//   uniform vec2 u_mouse;
//   uniform float u_time;

//   void main() {
//     vec2 uv = gl_FragCoord.xy;
//     vec2 center = u_resolution * 0.5;
//     float d = distance(uv, center);

//     if (d < sin(fract(u_time)) * u_resolution.x) {
//       gl_FragColor = vec4(1., 0., 0., 1.);
//     }
//   }
// `

// const STAR_VERTEX = `
//   uniform vec2 u_resolution;
//   attribute float size;
//   attribute vec3 flareColor;
//   varying vec3 v_color;

//   void main() {
//     v_color = flareColor;
//   }
// `

// const STAR_FRAGMENT = `
//   uniform vec2 u_resolution;
//   uniform vec3 u_color;

//   void main() {
//     vec2 uv = gl_FragCoord.xy;
//     vec2 center = u_resolution * 0.5;
//     float d = distance(uv, center);

//     float alpha = smoothstep(d - (u_resolution.x / 1.75), d - 1., 0.);
//     gl_FragColor = vec4(u_color, alpha);
//   }
// `

// const uniforms = {
//   u_time: { type: "f", value: 1.0 },
//   position: { type: "v2", value: new Vector3() },
// }

// type Props = {
//   data: System;
//   index: number;
// }

// const SolarSystem: FC<Props> = ({ data, index, ...props }) => {
//   const activeKills = useSelector(getKillSystems);
//   const target = useSelector(getCurrentSystem);
//   const dispatch = useDispatch();

//   const starRef = useRef<Mesh>();
//   const groupRef = useRef<Group<Object3DEventMap>>();
//   const prev = useRef(false);

//   const { position, radius } = useMemo(() => ({
//     radius: MathUtils.clamp(data.radius / 4000000000000, 0.7, 5),
//     position: new Vector3(
//       +data.position[0] / 1000000000000000,
//       +data.position[1] / 1000000000000000,
//       +data.position[2] / 1000000000000000,
//     ),
//   }), [data]);

//   const securityColor = useMemo(
//     () => getSecurityColor(data),
//     [data]
//   );

//   const focused = useMemo(() =>
//     target?.solarSystemID === data.solarSystemID,
//     [target]
//   );

//   const onSelect = () => {
//     dispatch(setCurrentSystem(data));
//   }

//   useEffect(() => {
//     const isActive = activeKills.includes(data.solarSystemID);

//     if (prev.current !== isActive) {
//       const group = groupRef.current;

//       if (isActive) {
//         const point = new SphereGeometry(9);
//         const shader = new ShaderMaterial({
//           uniforms,
//           fragmentShader: PULSE_FRAGMENT,
//         });

//         const mesh = new Mesh(point, shader);
//         group.add(mesh);
//       } else {
//         group.remove(group.children[1]);
//       }
//     }

//     prev.current = isActive;
//   }, [data, activeKills])

//   useFrame((state, delta) => {
//     const isActive = activeKills.includes(data.solarSystemID);

//     if (isActive) {
//       const pulse = groupRef.current.children[1] as Mesh;
//       const material = pulse.material as ShaderMaterial;

//       material.uniforms.u_resolution.value = new Vector2(window.innerWidth, window.innerHeight);
//       material.uniforms.u_time.value += state.clock.getDelta();
//     }
//   });

//   return (
//     <group ref={groupRef} position={position}>
//       <mesh ref={starRef} onClick={onSelect} {...props} >
//         <sphereGeometry args={[radius, 15, 15]} />
//         <meshMatcapMaterial />
//         {/* <shaderMaterial
//           opacity={1}
//           uniforms={uniforms}
//           fragmentShader={STAR_FRAGMENT}
//         /> */}
//       </mesh>
//     </group>
//   );
// }

// export default SolarSystem;