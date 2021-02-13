import { systems } from 'constants/systems';

import React, { useEffect } from 'react';
import { Canvas, useFrame, useThree } from "react-three-fiber";

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

const Application = () => {
  
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
        default:
      }
    });
  });

  return (
    <Canvas>
      <perspectiveCamera far={1000000000000} fov={1000000} />

      {systems.slice(0, 2000).map(info => <SolarSystem info={info} />)}
      
    </Canvas>
  );
}

export default Application;