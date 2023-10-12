import React, { FC, Fragment, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getDestination, getOrigin, getRoute, isNavOpen } from 'store/navigation/selectors';

import { Close } from '@mui/icons-material';
import { Button, Divider, Paper, TextField } from '@mui/material';

import { ApplicationState } from 'models/states';
import { systemDetails } from 'constants/systems';
import { toggleNav } from 'store/navigation/actions';

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

  const onClose = () => {
    dispatch(toggleNav(false));
  }

  return isOpen && (
    <Paper className="navigation-overlay">
      <div className="actions">
        <Button className="close-navigation" variant="text" onClick={onClose}>
          <Close />
        </Button>
      </div>

      <div className="route">
        <TextField
          className="origin"
          placeholder='Choose starting point'
          value={origin?.name} />
        <TextField
          className="destination"
          placeholder='Choose destination'
          value={destination?.name} />
      </div>

      {
        (!destination || !origin) && (
          <Fragment>
            <Divider />
            <div className="search-results">

            </div>
          </Fragment>
        )
      }

      {
        route?.length > 0 && (
          <Fragment>
            <Divider />
            <div className="path-route">

            </div>
          </Fragment>
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