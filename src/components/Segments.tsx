import React, { forwardRef } from 'react';
import { Color, AdditiveBlending } from 'three';

const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform float opacity;

  void main() {
    gl_FragColor = vec4(color, opacity);

  }
`

const uniforms = {
  color: { value: new Color('#ffffff') },
  opacity: { value: 0.1 }
}

const Segments = forwardRef<any>((props, ref) => (
  <lineSegments ref={ref} {...props}>
    <lineBasicMaterial
      opacity={0.2}
      transparent={true}
    />
    {/* <shaderMaterial
      uniforms={uniforms}
      fragmentShader={FRAGMENT_SHADER}
      blending={AdditiveBlending}
      depthTest={false}
      transparent={true}
    /> */}
  </lineSegments>
));

export default Segments;