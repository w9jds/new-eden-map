import { systems } from 'constants/systems';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";

import { TrackballControls } from './TrackBallControls';
import SolarSystem from './SolarSystem';

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
  const { mouse, camera } = useThree();

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
    // const canvas = document.querySelector('canvas');
    // new TrackballControls(camera, canvas);
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
        case 'w': camera.translateY(momentum); break;
        case 's': camera.translateY(-momentum); break;
        case 'd': camera.translateX(momentum); break;
        case 'a': camera.translateX(-momentum); break;
        case 'x': camera.translateZ(momentum); break;
        case 'z': camera.translateZ(-momentum); break;
        case 'e': camera.rotateY(-0.01); break;
        case 'q': camera.rotateY(0.01); break;
        case 'c': camera.rotateX(-0.01); break;
        
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
      <ambientLight />

      {systems.map(info => <SolarSystem info={info} />)}
    </Canvas>
  );
}

export default Application;