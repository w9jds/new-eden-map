import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import gsap from 'gsap';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { getCluster, getCurrentSystem } from 'store/current/selectors';

import { System } from 'models/universe';
import { SpaceClusters } from 'models/states';

type CameraPosition = {
  position: Vector3;
  target: Vector3;
};

const Clusters: Record<SpaceClusters, CameraPosition> = {
  [SpaceClusters.Known]: {
    position: new Vector3(0.0004644906058459782, -565.1667887947551, -0.0003220098946984917),
    target: new Vector3(0, 0, 0),
  },
  [SpaceClusters.Wormhole1]: {
    position: new Vector3(7704.441399130711, -755.0704954348928, -9488.52380004254),
    target: new Vector3(7704.441601384389, 4.92950456472716, -9488.52453267123),
  },
  [SpaceClusters.Wormhole2]: {
    position: new Vector3(7470.350552798675, 932.4846327917217, -9802.840230027234),
    target: new Vector3(7521.4758394567525, 1569.8713804253362, -9677.487068797976),
  }
}

export const useCamera = () => {
  const { scene, camera, gl } = useThree();
  const current = useSelector(getCurrentSystem);
  const cluster = useSelector(getCluster);

  const prev = useRef<System>(undefined);
  const tween = useRef<gsap.core.Tween>(undefined);
  const controls = useRef<OrbitControls>(undefined);

  useEffect(() => {
    scene.add(camera);
    camera.position.copy(Clusters['known'].position);
    

    const oc = new OrbitControls(camera, gl.domElement);
    // oc.enablePan = false;
    oc.enableDamping = true;
    oc.dampingFactor = 0.05;
    oc.minTargetRadius = 5;
    oc.maxDistance = 800;
    oc.maxPolarAngle = Math.PI / 2;
    oc.target.copy(Clusters['known'].target);

    controls.current = oc;
  }, []);

  useEffect(() => {
    const { position, target } = Clusters[cluster];
    // camera.position.copy(position);
    // controls.current.target.copy(target);
    // controls.current.update();

    const startTarget = controls.current.target.clone();
    const startPosition = camera.position.clone();

    const tweenTarget = { t: 0 };
    tween.current = gsap.to(tweenTarget, {
      t: 1,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        controls.current.target.lerpVectors(startTarget, target, tweenTarget.t);
        camera.position.lerpVectors(startPosition, position, tweenTarget.t);
        controls.current.update();
      },
      onComplete: function() {
        controls.current.target.copy(target);
        camera.position.copy(position);
        controls.current.update();
        tween.current = null;
      }
    });

  }, [cluster]);

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
      // const endTarget = new Vector3(...known.center);
      // const endPosition = new Vector3(...KnownSpace);

      // const tweenTarget = { t: 0 };
      // tween.current = gsap.to(tweenTarget, {
      //   t: 1,
      //   duration: 3,
      //   ease: "power2.inOut",
      //   onUpdate: function() {
      //     controls.current.target.lerpVectors(startTarget, endTarget, tweenTarget.t);
      //     camera.position.lerpVectors(startPosition, endPosition, tweenTarget.t);

      //     camera.updateProjectionMatrix();
      //     controls.current.update();
      //   },
      //   onComplete: function() {
      //     controls.current.target.copy(endTarget);
      //     camera.position.copy(endPosition);

      //     controls.current.update();
      //     camera.updateProjectionMatrix();
      //     tween.current = null;
      //   }
      // });
    }

    prev.current = current;
  }, [current]);

  useFrame(() => {
    if (!tween.current && controls.current) {
      controls.current.update();
    }

    console.log('position', camera.position);
    console.log('rotation', camera.rotation);
    console.log('target', controls.current.target);
  });

  return null;
}
