import React from 'react';
import { EffectComposer, Outline } from '@react-three/postprocessing'

const Effects = () => {
  return (
    <EffectComposer disableNormalPass>
      <Outline xRay={true} edgeStrength={100} width={900} />
    </EffectComposer>
  );
}

export default Effects;