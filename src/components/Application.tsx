import init from 'eve';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';

import { Canvas } from '@react-three/fiber';

import { FirebaseConfig } from 'config';
import { systems } from 'constants/systems';
import { setFirebaseApp } from 'store/current/reducer';
import { registerFeed } from 'store/kills/reducer';

import NewEden from './NewEden';
import SystemOverlay from 'controls/Overlays/System';
import SearchOverlay from 'controls/Overlays/Search';
import NavigationOverlay from 'controls/Overlays/Navigation';
import KillFeed from 'controls/Overlays/KillFeed';

import './Application.scss';

const Application = () => {
  const dispatch = useDispatch();

  const init_wasm = async () => {
    await init();
  }

  useEffect(() => {
    init_wasm();

    const firebaseApp = initializeApp(FirebaseConfig);
    dispatch(setFirebaseApp(firebaseApp));
    dispatch(registerFeed());
  }, []);

  return (
    <Fragment>
      <Canvas
        frameloop='always'
        shadows={false}
        camera={{ up: [0, -1, 0], castShadow: false }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio, alpha: true }}
      >
        <NewEden systems={systems} />
      </Canvas>

      <SystemOverlay />
      <SearchOverlay />
      <NavigationOverlay />
      <KillFeed />
    </Fragment>
  );
}

export default Application;