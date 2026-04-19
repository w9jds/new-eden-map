import init from 'eve';
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from 'firebase/app';

import { Canvas } from '@react-three/fiber';

import { FirebaseConfig } from 'config';
import { setFirebaseApp } from 'store/current/reducer';
import { registerFeed } from 'store/kills/reducer';

import SystemOverlay from 'controls/Overlays/System';
import SearchOverlay from 'controls/Overlays/Search';
import NavigationOverlay from 'controls/Overlays/Navigation';
import KillFeed from 'controls/Overlays/KillFeed';
import ViewSettings from 'controls/Overlays/Settings';
import NewEden from './NewEden';

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
        dpr={window.devicePixelRatio}
        gl={{ antialias: true, alpha: true }}
      >
        <NewEden />
      </Canvas>

      <ViewSettings />
      <SystemOverlay />
      <SearchOverlay />
      <NavigationOverlay />
      <KillFeed />
    </Fragment>
  );
}

export default Application;