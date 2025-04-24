/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BufferAttribute, BufferGeometry, Color, Line, LineBasicMaterial } from 'three';

import { getUniverse } from 'store/current/selectors';
import { getRoute } from 'store/navigation/selectors';
import { useThree } from '@react-three/fiber';

export const useRoute = () => {
  const { scene } = useThree();
  const lineRef = useRef<Line>(undefined);

  const route = useSelector(getRoute);
  const details = useSelector(getUniverse);

  const cleanupLine = () => {
    scene.remove(lineRef.current);
    lineRef.current.geometry.dispose();
    if (lineRef.current.material instanceof LineBasicMaterial) {
      lineRef.current.material.dispose();
    }
    lineRef.current = undefined;
  };

  useEffect(() => {
    if (lineRef.current) {
      cleanupLine();
    }

    if (route?.length) {
      const line = new Line();
      line.material = new LineBasicMaterial({
        transparent: true,
        opacity: 0.6,
        color: new Color(0xffffff),
      });

      let count = 0;
      const positions = [];
      for (let i = 0; i < route.length; i++) {
        const { position } = details[route[i]];

        let index = count * 3;
        positions[index] = position[0];
        positions[index + 1] = position[1];
        positions[index + 2] = position[2];
        count++;

        if (i !== 0 && i !== route.length - 1) {
          index = count * 3;
          positions[index] = position[0];
          positions[index + 1] = position[1];
          positions[index + 2] = position[2];
          count++;
        }
      }

      line.geometry = new BufferGeometry();
      line.geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));

      scene.add(line);
      lineRef.current = line;
    }
  }, [route])

}
