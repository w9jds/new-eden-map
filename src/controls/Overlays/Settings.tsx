import IconSwitch from 'controls/IconSwitch';
import { SpaceClusters } from 'models/states';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCluster } from 'store/current/reducer';

import './Settings.scss';

const ViewSettings = () => {
  const dispatch = useDispatch();

  const onClusterChange = (index: number) => {
    switch (index) {
      case 0:
        dispatch(setCluster(SpaceClusters.Known));
        break;
      case 1:
        dispatch(setCluster(SpaceClusters.Wormhole1));
        break;
      case 2:
        dispatch(setCluster(SpaceClusters.Wormhole2));
        break;
    }
  }

  return (
    <div className="view-settings">
      <IconSwitch className="cluster-switch" onChange={onClusterChange}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </IconSwitch>
    </div>
  );
}

export default ViewSettings;
