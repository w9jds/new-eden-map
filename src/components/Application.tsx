import React, { Fragment, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import NewEden from './NewEden';
import SystemOverlay from 'controls/SystemOverlay';

import './Application.scss';

const Camera = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(-151.87514771056715, 653.1205980784633, -84.05201235278793);
    camera.rotation.set(-1.5058901083058618, -0.14537999988034336, -0.58833952068214);

    new OrbitControls(camera, gl.domElement);
  }, []);

  return null;
}

const Application = () => {

  return (
    <Fragment>
      <Canvas>
        <Camera />
        <NewEden />
      </Canvas>

      <SystemOverlay />
    </Fragment>
  );
}

export default Application;