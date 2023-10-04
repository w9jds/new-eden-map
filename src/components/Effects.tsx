import React from 'react';
import { EffectComposer, Outline } from '@react-three/postprocessing'

const Effects = () => {
  return (
    <EffectComposer disableNormalPass>
      <Outline  />
    </EffectComposer>
  );
}

export default Effects;