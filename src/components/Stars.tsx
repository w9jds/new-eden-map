/* eslint-disable react/no-unknown-property */
import React, { FC, Fragment, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BufferGeometry, Color, MathUtils, Points, TextureLoader } from 'three';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';

import { getCurrentSystem, getUniverse } from 'store/current/selectors';
import { setSystem } from 'store/current/reducer';
import glow from 'textures/glow_texture.png';
import { getRoute } from 'store/navigation/selectors';

type Props = {
  ids?: number[] | string[];
}

const STAR_VERTEX = `
  attribute float size;
  attribute float alpha;
  attribute vec3 flareColor;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
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
  varying float vAlpha;

  void main() {
    if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0) {
      discard;
    }

    gl_FragColor = vec4(color * vColor, vAlpha);
    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
  }
`

const twinkleSpeed = 0.85;
const clockWarparound = 60 * 60 * 1000;

const flareTexture = new TextureLoader().load(glow)

const uniforms = {
  color: { value: new Color() },
  pointTexture: { value: flareTexture }
}

const Stars: FC<Props> = ({ ids }) => {
  const dispatch = useDispatch();
  const starRef = useRef<Points>(undefined);
  const clockTime = useRef(0);

  const details = useSelector(getUniverse);
  const system = useSelector(getCurrentSystem);
  const route = useSelector(getRoute);

  const { camera, raycaster, pointer } = useThree();
  const [ starIndex, setHoveredStar ] = useState(undefined);

  const onStarClick = (e: ThreeEvent<MouseEvent>) => {
    dispatch(setSystem(details[+ids[e.index]]));
  }

  const { positions, radii, colors, alpha } = useMemo(() => {
    const positions = [], radii = [], systemIds = [], alphas = [];

    for (const systemId of ids) {
      const  { solarSystemID, radius, position } = details[+systemId];

      alphas.push(1.0);
      radii.push(2.5 * (radius));
      positions.push(...position);
      systemIds.push(solarSystemID);
    }

    return {
      systemIds,
      radii: new Float32Array(radii),
      alpha: new Float32Array(alphas),
      positions: new Float32Array(positions),
      colors: new Float32Array(ids.length * 3),
    }
  }, [ids]);

  const updateStarGeometry = () => {
    const geometry = starRef.current.geometry as BufferGeometry;

    for (let i = 0; i < ids.length; i++) {
      const  { security } = details[+ids[i]];

      const twikleScale = MathUtils.clamp(
        -1 + Math.sin((clockTime.current + i) * twinkleSpeed) * 2, 0, 1
      );

      new Color('#a1a1a1')
        .lerp(new Color('#39b4f1'), security)
        .addScalar(twikleScale)
        .toArray(colors, i * 3);

      if (route?.length) {
        alpha[i] = route.includes(+ids[i]) ? 1.0 : 0.2;
      } else if (system) {
        alpha[i] = +ids[i] == system.solarSystemID ? 1.0 : 0.2;
      } else {
        alpha[i] = 1.0;
      }
    }

    geometry.attributes.alpha.needsUpdate = true;
    geometry.attributes.flareColor.needsUpdate = true;
    geometry.computeBoundingSphere();
  };

  const findPointerIntersects = () => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(starRef.current);
    if (intersects.length > 0) {
      const index = intersects[0].index;
      setHoveredStar(index);
    } else {
      setHoveredStar(undefined);
    }
  };

  useFrame((state, delta) => {
    clockTime.current = (clockTime.current + delta) % clockWarparound;

    if (starRef.current) {
      updateStarGeometry();
      findPointerIntersects();
    }
  });

  return ids && (
    <Fragment>
      <points ref={starRef} onClick={onStarClick}>
        <sphereGeometry attach="geometry">
          <bufferAttribute attach="attributes-size" count={ids.length} array={radii} itemSize={1} />
          <bufferAttribute attach="attributes-alpha" count={ids.length} array={alpha} itemSize={1} />
          <bufferAttribute attach="attributes-position" count={ids.length} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-flareColor" count={ids.length} array={colors} itemSize={3} />
        </sphereGeometry>
        <shaderMaterial
          transparent
          uniforms={uniforms}
          vertexShader={STAR_VERTEX}
          fragmentShader={STAR_FRAGMENT}
        />
      </points>
    </Fragment>
  );
}

export default Stars;