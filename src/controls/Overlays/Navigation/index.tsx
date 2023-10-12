import React, { FC, Fragment, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Close } from '@mui/icons-material';
import { Button, Divider, Paper, TextField } from '@mui/material';
import Result from '../Search/Result';

import { System } from 'models/universe';
import { ApplicationState } from 'models/states';
import { systemDetails, systems } from 'constants/systems';
import { setDestination, setOrigin, toggleNav } from 'store/navigation/actions';
import { getDestination, getOrigin, getRoute, isNavOpen } from 'store/navigation/selectors';

import './index.scss';


type Props = ReturnType<typeof mapStateToProps>;

const NavigationOverlay: FC<Props> = ({
  route,
  isOpen,
  originId,
  destinationId,
}) => {
  const dispatch = useDispatch();

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
  )

  const onSearchChange = (e) => {
    setQuery(e.target.value);

    setOptions(
      systems
        .filter(system => new RegExp(e.target.value, 'i').test(system.name))
        .map(system => system.solarSystemID)
        .splice(0, 20)
    );
  }

  const onResultClick = (system: System) => {
    if (focus === 'origin') {
      dispatch(setOrigin(system.solarSystemID));
    } else if (focus === 'destination') {
      dispatch(setDestination(system.solarSystemID));
    }

    setQuery('');
    setOptions([]);
    setFocus(undefined);
  }

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
          onFocus={() => setFocus('origin')}
          onChange={onSearchChange}
          value={origin} />
        <TextField
          className="destination"
          placeholder='Choose destination'
          onFocus={() => setFocus('destination')}
          onChange={onSearchChange}
          value={destination} />
      </div>

      {
        options && (
          <Fragment>
            <Divider />
            <div className="search-results">
              {options.map(option => <Result mini key={option} onClick={onResultClick} systemId={option} />)}
            </div>
          </Fragment>
        )
      }

      {
        stops?.length > 0 && (
          <Fragment>
            <Divider />
            <div className="path-route">
              {stops.map(stop => <span>{stop?.name}</span>)}
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