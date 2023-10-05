import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';

import gsap from 'gsap';
import { Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FirebaseConfig } from 'config';
import { systems } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';
import { setFirebaseApp } from 'store/current/actions';
import { registerKillFeed } from 'store/kills/actions';

import NewEden from './NewEden';
import Effects from './Effects';
import SystemOverlay from 'controls/Overlays/System';
import SearchOverlay from 'controls/Overlays/Search';
import KillFeed from 'controls/Overlays/KillFeed';

import './Application.scss';

const Camera = () => {
  const { camera, gl } = useThree();
  const [controls, setControls] = useState<OrbitControls>();
  const current = useSelector(getCurrentSystem);

  useEffect(() => {
    camera.position.set(187.41718439748556, 492.2187090727254, -250.123415836688);
    camera.rotation.set(-1.9050773839836128, 0.445220982640734, 2.249474219409512);

    setControls(new OrbitControls(camera, gl.domElement));
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
        onUpdate: () => {
          controls.update();

          // const distance = camera.position.distanceTo(to);
          // console.log(distance);
        }
      });

      // camera.updateMatrixWorld();
    }
  }, [current]);

  useFrame(() => {

  })

  return null;
}

const Application = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseApp = initializeApp(FirebaseConfig);
    dispatch(setFirebaseApp(firebaseApp));
    dispatch(registerKillFeed());
  }, []);

  return (
    <Fragment>
      <Canvas gl={{ antialias: true, pixelRatio: window.devicePixelRatio, logarithmicDepthBuffer: true }}>
        <Camera />
        <NewEden systems={systems} />
        <Effects />
      </Canvas>

      <SystemOverlay />
      <SearchOverlay />
      <KillFeed />
    </Fragment>
  );
}

export default Application;