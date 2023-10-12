import React, { FC, Fragment, useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { BufferGeometry, Group, Color, MathUtils, Points, TextureLoader, Vector3, Vector2, ShaderMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

import { systemDetails } from 'constants/systems';
import glow from 'textures/glow_texture.png';

type Props = {
  ids: number[];
}

const STAR_VERTEX = `
  attribute float size;
  attribute vec3 flareColor;
  varying vec3 vColor;

  void main() {
    vColor = flareColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const STAR_FRAGMENT = `
  uniform vec3 color;
  uniform sampler2D pointTexture;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(color * vColor, 1.0);
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  }
`

// const VERTEX_SHADER = `
//   attribute float size;
//   attribute vec3 flareColor;
//   varying vec3 vColor;

//   void main() {
//     vColor = flareColor;
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//     gl_PointSize = size * (300.0 / -mvPosition.z);
//     gl_Position = projectionMatrix * mvPosition;
//   }
// `

// const FRAGMENT_SHADER = `
//   uniform vec3 color;
//   uniform sampler2D pointTexture;
//   varying vec3 vColor;

//   void main() {
//     gl_FragColor = vec4(color * vColor, 1.0);
//     gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
//   }
// `

const twinkleSpeed = 0.85;
const clockWarparound = 60 * 60 * 1000;

const flareTexture = new TextureLoader().load(glow)

const uniforms = {
  color: { value: new Color() },
  pointTexture: { value: flareTexture }
}

const Stars: FC<Props> = ({ ids }) => {
  const starRef = useRef<Points>();
  const clockTime = useRef(0);
  const [ hovered, setHover ] = useState(false);

  const { positions, radii, colors } = useMemo(() => {
    const positions = [], radii = [], systemIds = [];

    for (let i = 0; i < ids.length; i++) {
      const  { solarSystemID, radius, position } = systemDetails[ids[i]];

      systemIds.push(solarSystemID);
      radii.push(2.0 * (radius / 1000000000000));
      positions.push(
        position[0] / 1000000000000000,
        position[1] / 1000000000000000,
        position[2] / 1000000000000000
      );
    }

    return {
      systemIds,
      radii: new Float32Array(radii),
      positions: new Float32Array(positions),
      colors: new Float32Array(ids.length * 3),
    }
  }, [ids]);

  useFrame((state, delta) => {
    clockTime.current = (clockTime.current + delta) % clockWarparound;

    if (starRef.current) {
      const geometry = starRef.current.geometry as BufferGeometry;
      const material = starRef.current.material as ShaderMaterial;

      for (let i = 0; i < ids.length; i++) {
        const  { security } = systemDetails[ids[i]];

        const twikleScale = MathUtils.clamp(
          -1 + Math.sin((clockTime.current + i) * twinkleSpeed) * 2, 0, 1
        );

        new Color('#a1a1a1')
          .lerp(new Color('#39b4f1'), security)
          .addScalar(twikleScale)
          .toArray(colors, i * 3);
      }

      geometry.attributes.flareColor.needsUpdate = true;
    }
  })

  const onRegionEnter = () => {
    setHover(true);
  }

  const onRegionLeave = () => {
    setHover(false);
  }

  return ids && (
    <Fragment>
      <points ref={starRef} onPointerEnter={onRegionEnter} onPointerLeave={onRegionLeave}>
        <sphereGeometry attach="geometry">
          <bufferAttribute attach="attributes-size" count={ids.length} array={radii} itemSize={1} />
          <bufferAttribute attach="attributes-position" count={ids.length} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-flareColor" count={ids.length} array={colors} itemSize={3} />
        </sphereGeometry>
        <shaderMaterial
          transparent
          uniforms={uniforms}
          depthFunc={1}
          vertexShader={STAR_VERTEX}
          fragmentShader={STAR_FRAGMENT}
        />
      </points>
    </Fragment>
  );
}

export default Stars;