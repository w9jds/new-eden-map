import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { KillMail } from 'models/killmail';
import { getKillFeed } from 'store/kills/selectors';
import Card from './Card';

import './index.scss';

const variants: Variants = {
  initial: {
    x: 0,
    opacity: 1,
  },
  open: {
    x: 0,
    transition: {
      // type: 'easeInOut',
      stiffness: 320,
      damping: 30,
    },
  },
  closed: {
    x: '100%',
    transition: {
      // type: 'easeInOut',
      stiffness: 320,
      damping: 30,
      delay: 0.05,
    },
  },
};


const KillFeed = () => {
  const kills: KillMail[] = useSelector(getKillFeed);
  const [animate, setAnimate] = useState('open');
  const [isOpen, setOpen] = useState(true);

  const toggleFeed = () => {
    if (animate === 'open') {
      setAnimate('closed');
    } else {
      setAnimate('open');
    }
  }

  const onStart = () => {
    if (animate === 'open') {
      setOpen(true);
    }
  }

  const onEnd = () => {
    if (animate === 'closed') {
      setOpen(false);
    }
  }

  return (
    <motion.div
      className="feed-drawer"
      key="drawer-content"
      variants={variants}
      initial="initial"
      animate={animate}
      onAnimationStart={onStart}
      onAnimationComplete={onEnd}
    >
      <div className="handle" onClick={toggleFeed}>
        { isOpen ? <MenuIcon /> : <MenuOpenIcon /> }
      </div>
      {
        isOpen && (
          <div className="kill-feed">
            <AnimatePresence initial={false}>
              {kills.map(mail => <Card key={mail.killmail_id} data={mail} />)}
            </AnimatePresence>
          </div>
        )
      }
    </motion.div>
  );
}

export default KillFeed;