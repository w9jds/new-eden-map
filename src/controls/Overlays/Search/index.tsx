import React, { Fragment, useState, useMemo, useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Divider, Paper } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchResult from './Result';

import { System } from 'models/universe';
import { systems } from 'constants/systems';
import { setCurrentSystem } from 'store/current/actions';
import { getCurrentSystem } from 'store/current/selectors';

import './index.scss';

const SearchOverlay = () => {
  const current = useSelector(getCurrentSystem);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState<number[]>([]);

  useEffect(() => {
    if (value !== current?.name) {
      setValue(current?.name);
    }
  }, [current]);

  useEffect(() => {
    setOpen(options.length > 0);
  }, [options])

  useEffect(() => {
    if (!value) {
      setOptions([]);
    }
  }, [value])

  const overlay = useMemo(() => classnames('search-overlay', {
    'collapsed': !isOpen,
    'expanded': isOpen
  }), [isOpen]);

  const onClear = () => {
    dispatch(setCurrentSystem(null));
    setValue('');
  }

  const onSearchChange = (e) => {
    setValue(e.target.value);

    setOptions(
      systems
        .filter(system => new RegExp(e.target.value, 'i').test(system.name))
        .map(system => system.solarSystemID)
        .splice(0, 20)
    );
  }

  const onResultClick = (system: System) => {
    dispatch(setCurrentSystem(system));
    setValue(system.name);
    setOptions([]);
  }

  return (
    <Paper className={overlay}>
      <div className="search-bar">
        <input className="search"
          placeholder="Search New Eden"
          value={value}
          onChange={onSearchChange}/>

        {
          current && (
            <Button variant="text" onClick={onClear}>
              <Close />
            </Button>
          )
        }
      </div>

      {
        isOpen && (
          <Fragment>
            <Divider />
            <div className="search-results">
              {options.map(option => <SearchResult key={option} onClick={onResultClick} systemId={option} />)}
            </div>
          </Fragment>
        )
      }
    </Paper>
  );
}

export default SearchOverlay;