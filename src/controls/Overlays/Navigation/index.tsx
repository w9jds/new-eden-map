import React, { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Close } from '@mui/icons-material';
import { Button, ButtonGroup, CircularProgress, Divider, Paper, TextField, Typography } from '@mui/material';
import SystemTile from 'controls/SystemTile';

import { System } from 'models/universe';
import { RouteType, SolarSystem } from 'models/resolvers-types';
import { systemDetails, systems } from 'constants/systems';
import { setFlag, setRoute, toggleNav } from 'store/navigation/reducer';
import { getDefaultId, getFlag, isNavOpen } from 'store/navigation/selectors';
import { useRouteQuery } from 'queries/Route';

import './index.scss';

const initial = {
  isOpen: false,
}

const NavigationOverlay: FC = () => {
  const dispatch = useDispatch();
  const prev = useRef(initial);

  const defaultId = useSelector(getDefaultId);
  const isOpen = useSelector(isNavOpen);
  const flag = useSelector(getFlag);

  const [originId, setOrigin] = useState<number>();
  const [destinationId, setDestination] = useState<number>();
  const [stops, setStops] = useState<SolarSystem[]>();

  const [focus, setFocus] = useState('');
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<number[]>([]);

  const { getRoute, loading, data, error } = useRouteQuery();

  useEffect(() => {
    if (prev.current.isOpen !== isOpen && isOpen && defaultId) {
      setDestination(defaultId);
    }

    if (prev.current.isOpen && !isOpen) {
      setOrigin(undefined);
      setDestination(undefined);
    }

    prev.current.isOpen = isOpen;
  }, [isOpen, defaultId])

  useEffect(() => {
    if (isOpen && destinationId && originId && flag) {
      getRoute({
        variables: {
          options: {
            start: originId,
            destinations: [destinationId],
            type: flag
          }
        }
      });
    }
  }, [destinationId, originId, flag])

  useEffect(() => {
    if (!isOpen || loading || error) {
      setStops(undefined);
      return;
    }

    if (data?.routes?.[0] && data?.routes?.[0]?.length > 0) {
      const gates = data.routes[0];
      const systems: SolarSystem[] = [];

      for (let i = 0; i < gates.length; i++) {
        const gate = gates[i];
        systems.push(gate.system);

        if (i + 1 === gates.length) {
          systems.push(gate.destination.system);
        }
      }

      dispatch(setRoute(systems.map(system => system.id)));
      setStops(systems);
    }
  }, [data, error, loading])

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


  const resetState = () => {
    setQuery('');
    setOptions([]);
    setStops(undefined);
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
      setOrigin(system.solarSystemID);
    } else if (focus === 'destination') {
      setDestination(system.solarSystemID);
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
    dispatch(toggleNav({ state: false }));
    setOrigin(undefined);
    setDestination(undefined);
  }

  const updateRouting = (type: RouteType) => () => {
    dispatch(setFlag(type))
  }

  return isOpen && (
    <Paper className="navigation-overlay">
      <div className="actions">
        <ButtonGroup className="types" size="small">
          <Button variant={flag === RouteType.Shortest ? 'contained' : 'outlined'} onClick={updateRouting(RouteType.Shortest)}>
            Shortest
          </Button>
          <Button variant={flag === RouteType.Secure ? 'contained' : 'outlined'} onClick={updateRouting(RouteType.Secure)}>
            Secure
          </Button>
          <Button variant={flag === RouteType.LessSafe ? 'contained' : 'outlined'} onClick={updateRouting(RouteType.LessSafe)}>
            Less Secure
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
          <>
            <Divider />
            <div className="search-results">
              {options.map(option => <SystemTile mini key={option} onClick={onResultClick} systemId={option} />)}
            </div>
          </>
        )
      }

      {
        loading && !focus && (
          <>
            <Divider />
            <CircularProgress />
          </>
        )
      }

      {
        stops?.length > 0 && !loading && !focus && (
          <>
            <Divider />
            <div className="pathing">
              <Typography variant="h6">
                {`${stops.length - 1} Jumps`}
              </Typography>

              <div className="pathing-route">
                {stops.map(stop =>
                  <div key={stop?.id} className="stop">
                    <span>{stop?.name}</span>
                    <span>{stop?.securityStatus.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )
      }
    </Paper>
  );
}

export default NavigationOverlay;