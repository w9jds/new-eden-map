import React, { useRef, useState } from 'react';

import { Information } from 'models/systems';
import { Mesh } from 'three';


type Attributes = {
  info: Information;
}

type Props = Attributes;

const SolarSystem = (props: Props) => {
  const { info } = props;

  const mesh = useRef<Mesh>();

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <mesh
      key={info.id}
      ref={mesh}
      position={[info.x, info.y, info.z]}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereBufferGeometry args={[5, 32, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default SolarSystem;