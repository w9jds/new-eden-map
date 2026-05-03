import React, { FC, useMemo } from 'react';
import { format } from 'date-fns';
import { motion, Variants } from 'framer-motion';

import KillingBlow from './KillingBlow';
import Attackers from './Attackers';
import Victim from './Victim';

import { useKillUtils } from './effects';
import { KillMail } from 'models/killmail';

type KillProps = {
  data: KillMail;
}

const variants: Variants = {
  initial: {
    opacity: 0,
    y: -200,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      // type: 'easeInOut',
      stiffness: 300,
      damping: 25,
      y: { 
        // type: 'easeInOut',
        stiffness: 300, 
        damping: 25 
      }
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    transition: {
      opacity: { duration: 0.2 },
      x: { duration: 0.4, ease: 'easeInOut' }
    }
  }
};

const KillCard: FC<KillProps> = ({ data }) => {
  const { killingBlow, victim } = useKillUtils(data);

  const time = useMemo(
    () => data?.killmail_time && new Date(data.killmail_time),
    [data]
  );

  const onKillOpen = () => {
    window.open(`https://zkillboard.com/kill/${data.killmail_id}/`);
  }

  return data && (
    <motion.div
      key={data.killmail_id}
      className="killmail"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={onKillOpen}
    >
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
    </motion.div>
  );
}

export default KillCard;
