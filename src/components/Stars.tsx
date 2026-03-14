import React, { FC, Fragment, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BufferGeometry, Color, MathUtils, Points, TextureLoader } from 'three';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { getSecurityColor } from 'utils/universe';

import { getCurrentSystem, getUniverse } from 'store/current/selectors';
import { setSystem } from 'store/current/reducer';
import { getRoute } from 'store/navigation/selectors';
import sphere from 'textures/sphere.png';

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
  uniform vec3 u_color;
  uniform sampler2D u_texture;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    gl_FragColor = vec4(u_color * vColor, vAlpha);
    gl_FragColor = gl_FragColor * texture2D(u_texture, gl_PointCoord);

    float colorLength = length(gl_FragColor.rgb);

    if (colorLength < 0.1 || gl_FragColor.a < 0.1) {
      discard;
    }
  }
`

enum Radius {
  FOCUSED = 9,
  BACKGROUND = 4,
};

enum Alpha {
  FOCUSED = 1.0,
  BACKGROUND = 0.2,
};

const twinkleSpeed = 0.85;
const clockWarparound = 60 * 60 * 1000;

const sphereTexture = new TextureLoader().load(sphere)

const uniforms = {
  u_color: { value: new Color() },
  u_texture: { value: sphereTexture }
}

const Stars: FC<Props> = ({ ids }) => {
  const dispatch = useDispatch();
  const starRef = useRef<Points>(undefined);
  const clockTime = useRef(0);

  const details = useSelector(getUniverse);
  const system = useSelector(getCurrentSystem);
  const route = useSelector(getRoute);

  const { camera, raycaster, pointer } = useThree();
  const [starIndex, setHoveredStar] = useState(undefined);

  const onStarClick = (e: ThreeEvent<MouseEvent>) => {
    dispatch(setSystem(details[+ids[e.index]]));
  }

  const { positions, radii, colors, alpha } = useMemo(() => {
    const positions = [], radii = [], systemIds = [], alphas = [];

    for (const systemId of ids) {
      const { solarSystemID, position } = details[+systemId];

      radii.push(Radius.FOCUSED);
      alphas.push(Alpha.FOCUSED);
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

  // useEffect(() => {
  //   const geometry = new SphereGeometry();
  //   const material = new ShaderMaterial({
  //     transparent: true,
  //     uniforms,
  //     vertexShader: STAR_VERTEX,
  //     fragmentShader: STAR_FRAGMENT
  //   });

  //   const points = new Points()
  // }, [positions, radii, colors, alpha])

  const getColor = (index: number) => {
    const { solarSystemID, security, regionID } = details[+ids[index]];
    const securityColor = getSecurityColor(security);

    if (!route?.length && !system) {
      radii[index] = Radius.FOCUSED;
      alpha[index] = Alpha.FOCUSED;

      const twikleScale = MathUtils.clamp(
        -1 + Math.sin((clockTime.current + index) * twinkleSpeed) * 2, 0, 1
      );

      new Color('#a1a1a1')
        .lerp(new Color('#39b4f1'), security)
        .addScalar(twikleScale)
        .toArray(colors, index * 3);

      return;
    }

    if (route?.length) {
      if (route.includes(solarSystemID)) {
        new Color(securityColor).toArray(colors, index * 3);
        radii[index] = Radius.FOCUSED;
        alpha[index] = Alpha.FOCUSED;
        return;
      }
    }

    if (system && system.solarSystemID == solarSystemID) {
      new Color(securityColor).toArray(colors, index * 3);
      radii[index] = Radius.FOCUSED;
      alpha[index] = Alpha.FOCUSED;
      return;
    }

    new Color('#a1a1a1').toArray(colors, index * 3);
    radii[index] = Radius.BACKGROUND;
    alpha[index] = Alpha.BACKGROUND;
  }

  const updateStarGeometry = () => {
    const geometry = starRef.current.geometry as BufferGeometry;

    for (let i = 0; i < ids.length; i++) {
      getColor(i);
    }

    geometry.attributes.size.needsUpdate = true;
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
      <points ref={starRef} renderOrder={1} onClick={onStarClick}>
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