import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { Paper } from '@mui/material';
import KillingBlow from './KillingBlow';
import Attackers from './Attackers';
import Victim from './Victim';

import { useKillUtils } from './effects';
import { flagKillAsSeen } from 'store/kills/actions';
import { KillMail } from 'models/killmail';

type KillProps = {
  data: KillMail;
}

const KillCard: FC<KillProps> = ({ data }) => {
  const { killingBlow, victim } = useKillUtils(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (data?.killmail_id) {
        dispatch(flagKillAsSeen(data.killmail_id))
      }
    }, 30000);
  }, []);

  const time = useMemo(
    () => data?.killmail_time && new Date(data.killmail_time),
    [data]
  );

  const onKillOpen = () => {
    window.open(`https://zkillboard.com/kill/${data.killmail_id}`);
  }

  return data && !data?.seen && (
    <Paper key={data.killmail_id} className="killmail" onClick={onKillOpen}>
      <Victim data={data.victim} img={victim} names={data.names} />
      <div className="details">
        <div className="info">
          {
            data.names ?
              <span>
                {data.names[data.victim.ship_type_id].name}
              </span> : null
          }
          <span className="location">
            {data.names[data.solar_system_id].name}
          </span>
          <span className="time">
            {format(time, 'MMM dd, yyyy hh:mm aa')}
          </span>
        </div>
        <Attackers data={data.attackers} names={data.names} />
        <KillingBlow img={killingBlow} />
      </div>
    </Paper>
  );
}

export default KillCard;