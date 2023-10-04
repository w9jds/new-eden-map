import { System } from 'models/universe';
import { Vector3, BufferAttribute } from 'three';

export const buildAttributes = (count: number) => ({
  positions: new Float32Array(count * 3),
  colors: new Float32Array(count * 3),
  scales: new Float32Array(count),
})

export const setAttributes = (geometry: THREE.BufferGeometry, positions: Float32Array, colors: Float32Array, scales: Float32Array) => {
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