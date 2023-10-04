import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import NewEden from './NewEden';
import { systems } from 'constants/systems';
import { getCurrentSystem } from 'store/current/selectors';

import SystemOverlay from 'controls/SystemOverlay';
import SearchOverlay from 'controls/SearchOverlay';

import './Application.scss';
import { Quaternion, Vector3 } from 'three';
import gsap from 'gsap';

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

  return (
    <Fragment>
      <Canvas>
        <Camera />
        <NewEden systems={systems} />
      </Canvas>

      <SearchOverlay />
      <SystemOverlay />
    </Fragment>
  );
}

export default Application;