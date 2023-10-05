import React, { Fragment, useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';

import gsap from 'gsap';
import { Vector3 } from 'three';
import { Html } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FirebaseConfig } from 'config';
import { systems } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';
import { setFirebaseApp } from 'store/current/actions';

import NewEden from './NewEden';
import Effects from './Effects';
import SystemOverlay from 'controls/Overlays/System';
import SearchOverlay from 'controls/Overlays/Search';

import './Application.scss';

const Camera = () => {
  const { camera, gl } = useThree();
  const [controls, setControls] = useState<OrbitControls>();
  const current = useSelector(getCurrentSystem);

  useEffect(() => {
    camera.position.set(24.50844220337405, 541.4000031539805, -320.26971689413546);
    camera.rotation.set(-1.8549337081268555, 0.012245453223284115, 3.099687390298583);

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

  return null;
}

const Application = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const firebaseApp = initializeApp(FirebaseConfig);
    dispatch(setFirebaseApp(firebaseApp));
  }, []);

  return (
    <Fragment>
      <Canvas>
        <Camera />
        <Suspense fallback={<Html center>Loading.</Html>}>
          <NewEden systems={systems} />
        </Suspense>
        <Effects />
      </Canvas>

      <SystemOverlay />
      <SearchOverlay />
    </Fragment>
  );
}

export default Application;