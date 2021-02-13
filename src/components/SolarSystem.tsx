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

  const x = info.x / 1000000000000000;
  const y = info.y / 1000000000000000;
  const z = info.z / 1000000000000000;

  return (
    <mesh
      key={info.id}
      ref={mesh}
      position={[x, y, z]}
      scale={active ? [1.5, 1.5, 1.5] : [.5, .5, .5]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#000000" />
    </mesh>
  )
}

export default SolarSystem;