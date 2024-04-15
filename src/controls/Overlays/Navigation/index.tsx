import React, { FC, Fragment, useMemo, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { Close } from '@mui/icons-material';
import { Button, ButtonGroup, Divider, Paper, TextField, Typography } from '@mui/material';
import SystemTile from 'controls/SystemTile';

import { System } from 'models/universe';
import { ApplicationState } from 'models/states';
import { systemDetails, systems } from 'constants/systems';
import { setDestination, setFlag, setOrigin, toggleNav } from 'store/navigation/reducer';
import { getDestination, getFlag, getOrigin, getRoute, isNavOpen } from 'store/navigation/selectors';

import './index.scss';


type Props = ReturnType<typeof mapStateToProps>;

const NavigationOverlay: FC<Props> = ({
  route,
  isOpen,
  originId,
  destinationId,
}) => {
  const dispatch = useDispatch();
  const flag = useSelector(getFlag);

  const [focus, setFocus] = useState('');
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<number[]>([]);

  const destination = useMemo(
    () => {
      if (focus === 'destination') {
        return query;
      } else if (destinationId) {
        return systemDetails[destinationId]?.name;
      }
    },
    [destinationId, focus, query]
  );

  const origin = useMemo(
    () => {
      if (focus === 'origin') {
        return query;
      } else if (originId) {
        return systemDetails[originId]?.name;
      }
    },
    [originId, focus, query]
  );

  const stops = useMemo(
    () => {
      if (route) {
        return route.map(id => systemDetails[id]);
      }
    }, [route]
  );

  const resetState = () => {
    setQuery('');
    setOptions([]);
    setFocus(undefined);
  }

  const onSearchChange = (e) => {
    setQuery(e.target.value);

    setOptions(
      systems
        .filter(system => new RegExp(e.target.value, 'i').test(system.name))
        .map(system => system.solarSystemID)
        .splice(0, 20)
    );
  }

  const onResultClick = (e, system: System) => {
    if (focus === 'origin') {
      dispatch(setOrigin(system.solarSystemID));
    } else if (focus === 'destination') {
      dispatch(setDestination(system.solarSystemID));
    }

    resetState();
  }

  const onInputBlur = e => {
    if (e?.relatedTarget?.id !== 'system-tile') {
      resetState();
    }
  }

  const onClose = () => {
    resetState();
    dispatch(toggleNav(false));
  }

  const updateRouting = (type: "shortest" | "secure" | "known") => () => {
    dispatch(setFlag(type))
  }

  return isOpen && (
    <Paper className="navigation-overlay">
      <div className="actions">
        <ButtonGroup className="types" size="small">
          <Button variant={flag === 'shortest' ? 'contained' : 'outlined'} onClick={updateRouting('shortest')}>
            Shortest
          </Button>
          <Button variant={flag === 'secure' ? 'contained' : 'outlined'} onClick={updateRouting('secure')}>
            Secure
          </Button>
        </ButtonGroup>

        <Button className="close-navigation" variant="text" onClick={onClose}>
          <Close />
        </Button>
      </div>

      <div className="route">
        <TextField size="small"
          className="origin"
          placeholder='Choose starting point'
          onFocus={() => setFocus('origin')}
          onChange={onSearchChange}
          onBlur={onInputBlur}
          value={origin} />
        <TextField size="small"
          className="destination"
          placeholder='Choose destination'
          onFocus={() => setFocus('destination')}
          onChange={onSearchChange}
          onBlur={onInputBlur}
          value={destination} />
      </div>

      {
        options && (
          <Fragment>
            <Divider />
            <div className="search-results">
              {options.map(option => <SystemTile mini key={option} onClick={onResultClick} systemId={option} />)}
            </div>
          </Fragment>
        )
      }

      {
        stops?.length > 0 && !focus && (
          <Fragment>
            <Divider />
            <div className="pathing">
              <Typography variant="h6">
                {`${stops.length - 1} Jumps`}
              </Typography>

              <div className="pathing-route">
                {stops.map(stop =>
                  <div key={stop?.solarSystemID} className="stop">
                    <span>{stop?.name}</span>
                    <span>{stop?.security.toFixed(1)}</span>
                  </div>
                )}
              </div>
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