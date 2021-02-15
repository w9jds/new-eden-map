import React, { forwardRef } from 'react';

const Segments = forwardRef((props, ref) => (
  <lineSegments ref={ref} {...props}>
    <bufferGeometry />
    <lineBasicMaterial 
      linewidth={1}
      vertexColors={true}
      morphTargets={true}
      transparent={true}
    />
  </lineSegments>
));

export default Segments;