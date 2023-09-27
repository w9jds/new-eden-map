import React, { useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

import NewEden from './NewEden';

import './Application.scss';

const useEventListener = (eventName, handler) => {
  useEffect(() => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    }
  }, []);
}

const keyPressed = {};

const Camera = () => {
  const { camera } = useThree();

  const handleKeyDown = (e) => {
    if (!keyPressed[e.key]) {
      keyPressed[e.key] = new Date().getTime();
    }
  };

  const handleKeyUp = (e) => {
    delete keyPressed[e.key];
  };

  const mouseWheel = (e) => {
    let delta = e.wheelDelta;
    delta = delta / 240;
    delta = -delta;
    if (delta <= 0) {
      delta -= camera.position.z * 0.1;
    } else {
      delta += camera.position.z * 0.1;
    }
    if (camera.position.z + delta > 1 && camera.position.z + delta < 200) {
      camera.translateZ(delta);
    }
  };

  useEventListener('keydown', handleKeyDown);

  useEventListener('keyup', handleKeyUp);

  useEventListener('wheel', mouseWheel);

  useEffect(() => {
    camera.position.set(-151.87514771056715, 653.1205980784633, -84.05201235278793);
    camera.rotation.set(-1.5058901083058618, -0.14537999988034336, -0.58833952068214);
  }, []);

  useFrame((_, delta) => {
    Object.entries(keyPressed).forEach((e) => {
      const [key, start] = e;
      const duration = new Date().getTime() - +start;

      // increase momentum if key pressed longer
      let momentum = Math.sqrt(duration + 200) * 0.01 + 0.05;

      // adjust for actual time passed
      momentum = momentum * delta / 0.016;

      // increase momentum if camera higher
      momentum = momentum + camera.position.z * 0.02;

      switch (key) {
        case 'w': camera.translateY(5); break;
        case 's': camera.translateY(-5); break;
        case 'd': camera.translateX(5); break;
        case 'a': camera.translateX(-5); break;
        case 'x': camera.translateZ(5); break;
        case 'z': camera.translateZ(-5); break;

        case 't': camera.rotateY(-0.01); break;
        case 'y': camera.rotateY(0.01); break;
        case 'g': camera.rotateX(-0.01); break;
        case 'h': camera.rotateX(0.01); break;
        case 'b': camera.rotateZ(-0.01); break;
        case 'n': camera.rotateZ(0.01); break;

        default:
      }
    });
  });

  return null;
}

const Application = () => {

  return (
    <Canvas>
      <Camera />
      <NewEden />
    </Canvas>
  );
}

export default Application;