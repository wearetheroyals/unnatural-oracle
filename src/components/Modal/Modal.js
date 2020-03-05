import React, { useState, useMemo } from 'react';
import ModalContext from '../../store/modalContext';
import { motion, animatePresence, AnimatePresence } from 'framer-motion';
import styles from './ModalStyles.module.css';

const Modal = ({ open }) => {
  const handlLifeCycle = () => {
    // open ? animate.open() : animate.close();
  };

  const container = {
    hidden: { opacity: 0, transition: { delay: 0.3 } },
    visible: { opacity: 1 }
  };

  const content = {
    hidden: { scaleX: 0, scaleY: 0, opacity: 0, y: '-160%' },
    visible: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 }
    }
  };

  // each time the open prop changes, run handleLifeCycle()
  useMemo(handlLifeCycle, [open]);

  return (
    <ModalContext.Consumer>
      {({ closeModal }) => (
        <motion.div onClick={closeModal}>
          <AnimatePresence>
            {open ? (
              <motion.div
                className={styles.container}
                variants={container}
                initial='hidden'
                animate='visible'
                exit='hidden'
              >
                <motion.section className={styles.content} variants={content}>
                  {modalContent}
                </motion.section>
              </motion.div>
            ) : (
              ''
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;

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
