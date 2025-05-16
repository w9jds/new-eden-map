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
    position: new Vector3(-135.7457034231992, -592.461731689255, 43.10732897104868),
    target: new Vector3(-135.74624702204352, -0.00014045092898212373, 43.10756464505782),
  },
  [SpaceClusters.Wormhole1]: {
    position: new Vector3(7645.657724397371, -785.6880161038105, -9522.410584321784),
    target: new Vector3(7645.657241551519, 4.9294714466579945, -9522.411210369622),
  },
  [SpaceClusters.Wormhole2]: {
    position: new Vector3(7612.794957811452, -2120.622476031416, -9583.297403309087),
    target: new Vector3(7612.794499953768, -1544.6764552514085, -9583.297053761802),
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
    camera.position.copy(Clusters[cluster].position);

    const oc = new OrbitControls(camera, gl.domElement);
    oc.enablePan = false;
    oc.enableDamping = true;
    oc.dampingFactor = 0.05;
    // oc.minTargetRadius = 10;
    oc.maxDistance = 800;
    oc.maxPolarAngle = Math.PI / 2;
    oc.target.copy(Clusters[cluster].target);

    controls.current = oc;
  }, []);

  useEffect(() => {
    const { position, target } = Clusters[cluster];

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
      const endTarget = Clusters[cluster].target;
      const endPosition = Clusters[cluster].position;

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
