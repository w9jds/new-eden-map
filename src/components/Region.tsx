import React, { FC, useMemo, useRef } from 'react';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { useThree } from '@react-three/fiber';

import { Region } from 'models/universe';
import Constellation from './Constellation';

type Props = {
  data: Region;
}

const Region: FC<Props> = ({ data }) => {
  const { scene } = useThree();
  const regionRef = useRef<any>();

  const constellations = useMemo(
    () => data.constellations.map(id => <Constellation id={id} />),
    [data]
  );

  const onMouseEnter = () => {
    const outline = new LineSegments(
      new EdgesGeometry(regionRef.current.geometry),
      new LineBasicMaterial({color: 0x00000})
    );

    scene.add(outline);
  }

  const onMouseLeave = () => {
    // scene.remove(outline);
  }

  return (
    <group key={data.name} ref={regionRef} onPointerEnter={onMouseEnter} onPointerLeave={onMouseLeave}>
      {constellations}
    </group>
  );
};

export default Region;