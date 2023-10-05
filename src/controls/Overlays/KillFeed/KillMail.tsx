import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Paper, Tooltip } from '@mui/material';
import { KillMail } from 'models/killmail';
import { flagKillAsSeen } from 'store/kills/actions';
import { format } from 'date-fns';

type KillMailProps = {
  kill: KillMail
}

const KillMail: FC<KillMailProps> = ({
  kill
}) => {
  const dispatch = useDispatch();

  const time = useMemo(
    () => kill?.killmail_time && new Date(kill.killmail_time),
    [kill]
  );

  useEffect(() => {
    setTimeout(() => {
      if (kill?.killmail_id) {
        dispatch(flagKillAsSeen(kill.killmail_id))
      }
    }, 30000);
  }, [])

  const getAffiliationProps = person => {
    let type, id;

    if (person.alliance_id) {
      type = 'alliances';
      id = person.alliance_id;
    } else {
      type = 'corporations';
      id = person.corporation_id;
    }

    return type && id && {
      alt: kill.names && kill.names[id] ? kill.names[id].name : '',
      src: `https://images.evetech.net/${type}/${id}/logo?size=64`,
      onError: onAffiliationLoadError,
    };
  }

  const onPortraitLoadError = (e) => {
    e.target.src = 'https://images.evetech.net/characters/1/portrait?size=64';
  }

  const onAffiliationLoadError = (e) => {
    e.target.src = 'https://images.evetech.net/corporations/1/logo?size=64';
  }

  const victim = useMemo(() => kill?.victim && getAffiliationProps(kill.victim), [kill]);

  const killingBlow = useMemo(() => {
    if (!kill?.attackers) {
      return null;
    }

    for (let attacker of kill.attackers) {
      if (attacker.final_blow) {
        return getAffiliationProps(attacker);
      }
    }
  }, [kill]);

  const attackers = useMemo(() => {
    const ships = {};

    if (!kill?.attackers) {
      return null;
    }

    for (let attacker of kill.attackers) {
      if (attacker.ship_type_id) {
        if (!ships[attacker.ship_type_id]) {
          ships[attacker.ship_type_id] = {
            details: {
              alt: kill.names ? kill.names[attacker.ship_type_id].name : '',
              src: `https://images.evetech.net/types/${attacker.ship_type_id}/icon?size=64`
            },
            participants: 1,
          }
        } else {
          ships[attacker.ship_type_id].participants += 1;
        }
      }
    }

    return Object.keys(ships).map(id => {
      const ship = ships[id];

      return (
        <Tooltip key={id} arrow disableInteractive title={ship.details.alt} placement="top">
          <div className="attacker-ship">
            <img {...ship.details} />
            <div className="participants-badge">
              <span>{ship.participants}</span>
            </div>
          </div>
        </Tooltip>
      );
    });
  }, [kill]);

  return kill && !kill?.seen && (
    <Paper key={kill.killmail_id} className="killmail">
      <div className="images">
        <img
          className="ship-lost"
          alt={kill.names ? kill.names[kill.victim.ship_type_id].name : null}
          src={`https://images.evetech.net/types/${kill.victim.ship_type_id}/render?size=128`}
        />

        <div className="victim-info">
          {
            kill.victim && kill.victim.character_id &&
              <Tooltip arrow disableInteractive title={kill.names ? kill.names[kill.victim.character_id].name : ''} placement="top">
                <img
                  className="portrait"
                  onError={onPortraitLoadError}
                  src={`https://images.evetech.net/characters/${kill.victim.character_id}/portrait?size=64`}
                />
              </Tooltip>
          }
          <Tooltip arrow disableInteractive title={victim.alt} placement="top">
            <img className="affiliation" {...victim}/>
          </Tooltip>
        </div>
      </div>

      <div className="details">
        <div className="info">
          {
            kill.names ?
              <span>
                {kill.names[kill.victim.ship_type_id].name}
              </span> : null
          }
            <span className="location">
              {kill.names[kill.solar_system_id].name}
            </span>
          <span className="time">
            {format(time, 'MMM dd, yyyy hh:mm aa')}
          </span>
        </div>
        <div className="confrontation">
          {attackers}
        </div>
        {
          killingBlow &&
            <div className="killing-blow">
              <Tooltip arrow disableInteractive title={killingBlow.alt} placement="top">
                <img className="killer" {...killingBlow}/>
              </Tooltip>
            </div>
        }
      </div>
    </Paper>
  );
}

export default KillMail;