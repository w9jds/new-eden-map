import React, { FC, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getDestination, getOrigin, getRoute, isNavOpen } from 'store/navigation/selectors';

import { Paper, TextField } from '@mui/material';

import { ApplicationState } from 'models/states';
import { systemDetails } from 'constants/systems';

import './index.scss';

type Props = ReturnType<typeof mapStateToProps>;

const NavigationOverlay: FC<Props> = ({
  route,
  isOpen,
  originId,
  destinationId,
}) => {
  const dispatch = useDispatch();

  const destination = useMemo(
    () => systemDetails[destinationId],
    [destinationId]
  );

  const origin = useMemo(
    () => systemDetails[originId],
    [originId]
  );

  return isOpen && (
    <Paper className="navigation-overlay">
      <div className="route">
        <TextField value={origin?.name} />
        <TextField value={destination?.name} />
      </div>

      {
        (!destination || !origin) && (
          <div className="search-results">

          </div>
        )
      }

      {
        route?.length > 0 && (
          <div className="path-route">

          </div>
        )
      }
    </Paper>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  isOpen: isNavOpen(state),
  route: getRoute(state),
  originId: getOrigin(state),
  destinationId: getDestination(state),
});

export default connect(mapStateToProps)(NavigationOverlay);