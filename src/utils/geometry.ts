import { System } from 'models/universe';
import { Vector3, BufferAttribute, Color, BufferGeometry } from 'three';

export const buildAttributes = (count: number) => ({
  positions: new Float32Array(count * 3),
  colors: new Float32Array(count * 3),
  scales: new Float32Array(count),
})

export const setAttributes = (geometry: BufferGeometry, positions: Float32Array, colors: Float32Array, scales: Float32Array) => {
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('flareColor', new BufferAttribute(colors, 3));
  geometry.setAttribute('size', new BufferAttribute(scales, 1));

  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.flareColor.needsUpdate = true;
  geometry.attributes.size.needsUpdate = true;

  geometry.computeBoundingSphere();
}

const tempVector = new Vector3()
export const positionToArray = (details: System, target: Float32Array, index: number): void => {
  tempVector.x = +details.position[0] / 1000000000000000;
  tempVector.y = +details.position[1] / 1000000000000000;
  tempVector.z = +details.position[2] / 1000000000000000;

  tempVector.toArray(target, index * 3);
}

export const getSecurityColor = (system: System) => {
  const sec = +system.security.toFixed(1);

  if (sec < 0) {
    return new Color('#ff0000');
  }

  if (sec == 0) {
    return new Color('#f00000');
  }

  if (sec == 0.1) {
    return new Color('#d73000');
  }

  if (sec == 0.2) {
    return new Color('#f04800');
  }

  if (sec == 0.3) {
    return new Color('#f06000');
  }

  if (sec == 0.4) {
    return new Color('#d77700');
  }

  if (sec == 0.5) {
    return new Color('#efef00');
  }

  if (sec == 0.6) {
    return new Color('#8fef2f');
  }

  if (sec == 0.7) {
    return new Color('#00f000');
  }

  if (sec == 0.8) {
    return new Color('#00ef47');
  }

  if (sec == 0.9) {
    return new Color('#48f0c0');
  }

  if (sec == 1) {
    return new Color('#2fefef');
  }
}