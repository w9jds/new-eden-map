import React from 'react';
import { useSelector } from 'react-redux';

import { getKillFeed } from 'store/kills/selectors';
import KillMail from './KillMail';

import './index.scss';

const KillFeed = () => {
  const kills: KillMail[] = useSelector(getKillFeed);

  return (
    <div className="kill-feed">
      { kills.map(mail => <KillMail key={mail.killmail_id} kill={mail} />) }
    </div>
  );
}

export default KillFeed;