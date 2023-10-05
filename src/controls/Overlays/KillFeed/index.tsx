import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isBefore } from 'date-fns';

import { getKillFeed } from 'store/kills/selectors';
import KillMail from './KillMail';

import './index.scss';

const KillFeed = () => {
  const feed = useSelector(getKillFeed);
  const [ kills, setKills ] = useState([]);

  useEffect(() => {
    const ids = Object.keys(feed)
      .filter(id => !feed[id].seen)
      .sort((a, b) => {
        const killA = feed[a].reported;
        const killB = feed[b].reported;

        return isBefore(killA, killB) ? 1 : -1;
      });

    setKills(ids);
  }, [feed]);

  return (
    <div className="kill-feed">
      { kills.map(id => <KillMail key={id} kill={feed[id]} />) }
    </div>
  );
}

export default KillFeed;