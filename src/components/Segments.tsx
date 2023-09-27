import React, { forwardRef } from 'react';

import * as THREE from 'three';


const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform float opacity;

  void main() {
    gl_FragColor = vec4(color, opacity);
  }
`

const uniforms = {
  color: { value: new THREE.Color('#ffffff') },
  opacity: { value: 0.08 }
}

const Segments = forwardRef((props, ref) => (
  <lineSegments ref={ref} {...props}>
    <bufferGeometry />
    <shaderMaterial
      uniforms={uniforms}
      fragmentShader={FRAGMENT_SHADER}
      blending={THREE.AdditiveBlending}
      depthTest={false}
      transparent={true}
    />
  </lineSegments>
));

export default Segments;