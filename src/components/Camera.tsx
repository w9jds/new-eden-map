import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import gsap from 'gsap';
import { Box3, PerspectiveCamera, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { getCluster, getCurrentSystem, getUniverse } from 'store/current/selectors';
import { getRoute } from 'store/navigation/selectors';

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
  const route = useSelector(getRoute);
  const universe = useSelector(getUniverse);

  const prev = useRef<System>(undefined);
  const prevRoute = useRef<number[]>([]);
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

      const direction = camera.position.clone().sub(controls.current.target).normalize();
      const focusDistance = 40;
      const endPosition = endTarget.clone().addScaledVector(direction, focusDistance);

      const tweenTarget = { t: 0 };
      tween.current = gsap.to(tweenTarget, {
        t: 1,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function() {
          controls.current.target.lerpVectors(startTarget, endTarget, tweenTarget.t);
          camera.position.lerpVectors(startPosition, endPosition, tweenTarget.t);
          controls.current.update();
        },
        onComplete: function() {
          controls.current.target.copy(endTarget);
          camera.position.copy(endPosition);
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

  useEffect(() => {
    if (!controls.current) return;

    // Route cleared — animate back to the focused system or the full cluster view
    if (!route?.length) {
      if (!prevRoute.current.length) return;

      if (tween.current) {
        tween.current.kill();
        tween.current = null;
      }

      const startTarget = controls.current.target.clone();
      const startPosition = camera.position.clone();

      let endTarget: Vector3;
      let endPosition: Vector3;

      if (current) {
        endTarget = new Vector3(...current.position);
        const direction = camera.position.clone().sub(controls.current.target).normalize();
        endPosition = endTarget.clone().addScaledVector(direction, 40);
      } else {
        endTarget = Clusters[cluster].target.clone();
        endPosition = Clusters[cluster].position.clone();
      }

      const tweenObj = { t: 0 };
      tween.current = gsap.to(tweenObj, {
        t: 1,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function() {
          controls.current.target.lerpVectors(startTarget, endTarget, tweenObj.t);
          camera.position.lerpVectors(startPosition, endPosition, tweenObj.t);
          controls.current.update();
        },
        onComplete: function() {
          controls.current.target.copy(endTarget);
          camera.position.copy(endPosition);
          controls.current.update();
          tween.current = null;
        }
      });

      prevRoute.current = [];
      return;
    }

    if (!universe) return;

    const positions = route
      .filter(id => universe[id])
      .map(id => new Vector3(...universe[id].position));

    if (positions.length < 2) {
      prevRoute.current = route;
      return;
    }

    const box = new Box3().setFromPoints(positions);
    const endTarget = new Vector3();
    box.getCenter(endTarget);

    const boxSize = new Vector3();
    box.getSize(boxSize);

    const cam = camera as PerspectiveCamera;
    const fovV = cam.fov * (Math.PI / 180);
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * cam.aspect);
    const margin = 1.3;

    const distForZ = ((boxSize.z / 2) * margin) / Math.tan(fovV / 2);
    const distForX = ((boxSize.x / 2) * margin) / Math.tan(fovH / 2);
    const distance = Math.min(
      Math.max(distForZ, distForX, 40),
      controls.current.maxDistance * 0.95
    );

    // Preserve the current viewing direction so OrbitControls sees no azimuth change
    const currentDir = camera.position.clone().sub(controls.current.target).normalize();
    const endPosition = endTarget.clone().addScaledVector(currentDir, distance);

    if (tween.current) {
      tween.current.kill();
      tween.current = null;
    }

    const startTarget = controls.current.target.clone();
    const startPosition = camera.position.clone();

    const tweenObj = { t: 0 };
    tween.current = gsap.to(tweenObj, {
      t: 1,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        controls.current.target.lerpVectors(startTarget, endTarget, tweenObj.t);
        camera.position.lerpVectors(startPosition, endPosition, tweenObj.t);
        controls.current.update();
      },
      onComplete: function() {
        controls.current.target.copy(endTarget);
        camera.position.copy(endPosition);
        controls.current.update();
        tween.current = null;
      }
    });

    prevRoute.current = route;
  }, [route]);

  useFrame(() => {
    if (!tween.current && controls.current) {
      controls.current.update();
    }
  });

  return null;
}
