import React from 'react';
import { useSelector } from 'react-redux';

import { KillMail } from 'models/killmail';
import { getKillFeed } from 'store/kills/selectors';
import Card from './Card';

import './index.scss';

const KillFeed = () => {
  const kills: KillMail[] = useSelector(getKillFeed);

  return (
    <div className="kill-feed">
      { kills.map(mail => <Card key={mail.killmail_id} data={mail} />) }
    </div>
  );
}

export default KillFeed;