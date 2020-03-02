import React, { useState, useMemo } from 'react';
import ModalContext from '../store/modalContext';
import { motion } from 'framer-motion';

const Info = ({ open }) => {
  const handlLifeCycle = () => {
    console.log('Lifecycle methods!');
  };

  // each time the open prop changes, run handleLifeCycle()
  useMemo(handlLifeCycle, [open]);

  return (
    <ModalContext.Consumer>
      {({ closeModal }) => (
        <motion.div
          variants={container}
          initial={closed}
          transition={duration}
          animate={open ? 'open' : 'closed'}
          className='wtf'
          onClick={closeModal}
        >
          <motion.section variants={inner}>{modalContent}</motion.section>
        </motion.div>
      )}
    </ModalContext.Consumer>
  );
};

export default Info;

const modalContent = (
  <>
    <h3>WTF?</h3>
    <p>This is a thing by The Royals. We built it because, yeah. Why not.</p>
    <p>
      This is it. This is the answer. It says here that a bolt of lightning is
      gonna strike the clock tower precisely at 10:04 p.m. next Saturday night.
      If we could somehow harness this bolt of lightning, channel it into the
      flux capacitor, it just might work. Next Saturday night, we're sending you
      back to the future. Ah well, sort of. What, well you mean like a date?
      Scram, McFly. Thank god I still got my hair. What on Earth is that thing
      I'm wearing?
    </p>
    <p>
      If you like this, you'll love{' '}
      <a href='https://theroyals.com.au'>our website</a>.
    </p>
  </>
);

const duration = 0.5;

const container = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 1.5
    }
  },
  closed: {
    opacity: 0,
    scale: 0.1,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.5
    }
  }
};

const inner = {
  open: {
    opacity: 1,
    scale: 1
  },
  closed: {
    opacity: 0,
    scale: 0.1
  }
};
