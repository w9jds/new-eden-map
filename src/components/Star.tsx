// import React, { FC, useRef, useMemo, useEffect } from 'react';
// import { Group, MathUtils, Mesh, Object3DEventMap, ShaderMaterial, SphereGeometry, Vector2, Vector3 } from 'three';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFrame } from '@react-three/fiber';

// import { getCurrentSystem } from 'store/current/selectors';
// import { setCurrentSystem } from 'store/current/actions';
// import { getKillSystems } from 'store/kills/selectors';
// import { getSecurityColor } from 'utils/geometry';
// import { System } from 'models/universe';

// const clockWarparound = 60 * 60 * 1000;

// const VERTEX_SHADER = `
//   attribute float size;
//   attribute vec3 flareColor;
//   varying vec3 vColor;

//   void main() {
//     vColor = flareColor;
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//     gl_PointSize = size * (300.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
//   }
// `

// const FRAGMENT_SHADER = `
//   #ifdef GL_ES
//   precision mediump float;
//   #endif

//   uniform vec2 u_resolution;
//   uniform vec2 u_mouse;
//   uniform float u_time;

//   void main() {
//     vec2 uv = gl_FragCoord.xy;
//     vec2 center = u_resolution * 0.5;

//     if (distance(uv, center) < sin(u_time) * 150.) {
//       gl_FragColor = vec4(1, 0., 0., 0.5);
//     }
//   }
// `

// const uniforms = {
//   u_time: { type: "f", value: 1.0 },
//   u_resolution: { type: "v2", value: new Vector2() },
//   u_mouse: { type: "v2", value: new Vector2() }
// }

// type Props = {
//   system: System;
// }

// const SolarSystem: FC<Props> = ({ system, ...props }) => {
//   const dispatch = useDispatch();
//   const activeKills = useSelector(getKillSystems);
//   const target = useSelector(getCurrentSystem);

//   const startTime = useRef(0);
//   const groupRef = useRef<Group<Object3DEventMap>>();
//   const prev = useRef(false);

//   const { position, radius } = useMemo(() => ({
//     radius: MathUtils.clamp(system.radius / 4000000000000, 0.7, 5),
//     position: new Vector3(
//       +system.position[0] / 1000000000000000,
//       +system.position[1] / 1000000000000000,
//       +system.position[2] / 1000000000000000,
//     ),
//   }), [system]);

//   const securityColor = useMemo(
//     () => getSecurityColor(system),
//     [system]
//   );

//   const focused = useMemo(() =>
//     target?.solarSystemID === system.solarSystemID,
//     [target]
//   );

//   const onSelect = () => {
//     dispatch(setCurrentSystem(system));
//   }

//   useEffect(() => {
//     const isActive = activeKills.includes(system.solarSystemID);

//     if (prev.current !== isActive) {
//       startTime.current = new Date().getTime();
//       const group = groupRef.current;

//       if (isActive) {
//         const point = new SphereGeometry(9);
//         const shader = new ShaderMaterial({
//           uniforms,
//           fragmentShader: FRAGMENT_SHADER,
//           depthWrite: false,
//         });

//         const mesh = new Mesh(point, shader);
//         group.add(mesh);
//       } else {
//         group.remove(group.children[1]);
//       }
//     }

//     prev.current = isActive;
//   }, [system, activeKills])

//   useFrame((state, delta) => {
//     const mesh = groupRef.current.children[1] as Mesh;

//     if (mesh?.material instanceof ShaderMaterial) {
//       mesh.material.uniforms.u_resolution.value = [window.innerWidth, window.innerHeight];
//       mesh.material.uniforms.u_time.value = state.clock.getDelta();
//     }
//   });

//   return (
//     <group ref={groupRef} position={position}>
//       <mesh onClick={onSelect} {...props} >
//         <sphereGeometry args={[radius, 15, 15]} />
//         <meshNormalMaterial />
//       </mesh>
//     </group>
//   );
// }

// export default SolarSystem;