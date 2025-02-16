import React, { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';

import gsap from 'gsap';
import { Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FirebaseConfig } from 'config';
import { center, systems } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';
import { setFirebaseApp } from 'store/current/reducer';
import { registerFeed } from 'store/kills/reducer';

import NewEden from './NewEden';
import SystemOverlay from 'controls/Overlays/System';
import SearchOverlay from 'controls/Overlays/Search';
import NavigationOverlay from 'controls/Overlays/Navigation';
import KillFeed from 'controls/Overlays/KillFeed';
import { System } from 'models/universe';

import './Application.scss';

const Camera = () => {
  const prev = useRef<System>();

  const { camera, gl } = useThree();
  const [controls, setControls] = useState<OrbitControls>();
  const current = useSelector(getCurrentSystem);
  const [x, y, z] = useMemo(() => center(), []);

  useEffect(() => {
    const orbitControls = new OrbitControls(camera, gl.domElement);

    orbitControls.target.set(0,0,0);

    orbitControls.enablePan = false;
    orbitControls.enableDamping = true;

    orbitControls.minTargetRadius = 5;
    orbitControls.maxDistance = 800;

    orbitControls.maxPolarAngle = Math.PI / 2;

    setControls(orbitControls);
  }, []);

  useEffect(() => {
    if (current) {
      const to = new Vector3(
        current.position[0] / 1000000000000000,
        current.position[1] / 1000000000000000,
        current.position[2] / 1000000000000000
      );

      gsap.to(controls.target, {
        duration: 2,
        x: to.x,
        y: to.y,
        z: to.z,
        // onUpdate: () => {
        //   controls.update();

        //   // const distance = camera.position.distanceTo(to);
        //   // console.log(distance);
        // }
      });

      // camera.updateMatrixWorld();
    }
    if (prev.current && !current) {
      gsap.to(controls.target, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0
      })
    }

    prev.current = current;
  }, [current]);

  useFrame(() => {
    if (controls) {
      controls.update();
      // console.log(`target: ${controls.target}`);
      console.log(`distance: ${controls.getDistance()}`)
    }
  })

  return null;
}

const Application = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseApp = initializeApp(FirebaseConfig);
    dispatch(setFirebaseApp(firebaseApp));
    dispatch(registerFeed());
  }, []);

  return (
    <Fragment>
      <Canvas gl={{ antialias: true, pixelRatio: window.devicePixelRatio, logarithmicDepthBuffer: true }}>
        <Camera />
        <NewEden systems={systems} />
      </Canvas>

      <SystemOverlay />
      <SearchOverlay />
      <NavigationOverlay />
      <KillFeed />
    </Fragment>
  );
}

export default Application;