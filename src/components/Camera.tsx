import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import gsap from 'gsap';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { getCurrentSystem } from 'store/current/selectors';

import { System } from 'models/universe';

type PositionTuple = [number, number, number];

const initial: PositionTuple = [0.0004644906058459782, -565.1667887947551, -0.0003220098946984917];

export const useCamera = () => {
  const { camera, gl } = useThree();

  const prev = useRef<System>(undefined);
  const tween = useRef<gsap.core.Tween>(undefined);
  const controls = useRef<OrbitControls>(undefined);
  const current = useSelector(getCurrentSystem);

  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
    camera.position.set(initial[0], initial[1], initial[2]);
    camera.updateProjectionMatrix();

    const oc = new OrbitControls(camera, gl.domElement);
    oc.enablePan = false;
    oc.enableDamping = true;
    oc.dampingFactor = 0.05;
    oc.minTargetRadius = 5;
    oc.maxDistance = 800;
    oc.maxPolarAngle = Math.PI / 2;

    controls.current = oc;
  }, []);


  // const zoomToStar = (index: number) => {
  //   if (index === null || !starData[index]) return;

  //   const star = starData[index];
  //   const targetPosition = new THREE.Vector3(
  //     star.position[0] / 1000000000000000,
  //     star.position[1] / 1000000000000000,
  //     star.position[2] / 1000000000000000
  //   );

  //   // Animation variables
  //   const initialPosition = cameraRef.current!.position.clone();
  //   const initialTarget = controlsRef.current!.target.clone();
  //   const duration = 1000; // milliseconds
  //   const startTime = performance.now();

  //   // Animate the camera position
  //   const animate = (currentTime: number) => {
  //     const elapsedTime = currentTime - startTime;
  //     const progress = Math.min(elapsedTime / duration, 1); // Normalize progress

  //     // Use lerp for smooth transition
  //     cameraRef.current!.position.lerpVectors(initialPosition, targetPosition, progress);

  //     // Adjust zoom (optional, adjust the factor as needed)
  //     const zoomFactor = 2;
  //     cameraRef.current!.position.z = initialPosition.z + (targetPosition.z - initialPosition.z) * progress / zoomFactor;
  //     controlsRef.current!.target.lerp(targetPosition, progress);
  //     controlsRef.current!.update();

  //     rendererRef.current!.render(sceneRef.current!, cameraRef.current!);

  //     if (progress < 1) {
  //       requestAnimationFrame(animate);
  //     }
  //   };

  //   requestAnimationFrame(animate);
  // };


  useEffect(() => {
    const startTarget = controls.current.target.clone();
    const startPosition = camera.position.clone();

    if (tween.current) {
      tween.current.kill();
      tween.current = null;
    }

    if (current && prev.current !== current) {
      const endTarget = new Vector3(...current.position);

      const tweenTarget = { t: 0 };
      tween.current = gsap.to(tweenTarget, {
        t: 1,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
          controls.current.target.lerpVectors(startTarget, endTarget, tweenTarget.t);
          // camera.position.lerpVectors(startPosition, endPosition, tweenTarget.t);
          controls.current.update();
        },
        onComplete: function() {
          controls.current.target.copy(endTarget);
          // camera.position.copy(endPosition);
          controls.current.update();
          tween.current = null;
        }
      });
    }

    if (prev.current && !current) {
      const endTarget = new Vector3(0, 0, 0);
      const endPosition = new Vector3(...initial);

      const tweenTarget = { t: 0 };
      tween.current = gsap.to(tweenTarget, {
        t: 1,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
          controls.current.target.lerpVectors(startTarget, endTarget, tweenTarget.t);
          camera.position.lerpVectors(startPosition, endPosition, tweenTarget.t);

          camera.updateProjectionMatrix();
          controls.current.update();
        },
        onComplete: function() {
          controls.current.target.copy(endTarget);
          camera.position.copy(endPosition);

          controls.current.update();
          camera.updateProjectionMatrix();
          tween.current = null;
        }
      });
    }

    prev.current = current;
  }, [current]);

  useFrame(() => {
    if (!tween.current && controls.current) {
      controls.current.update();
    }
  });

  return null;
}
