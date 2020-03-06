import React, { useMemo } from 'react';
import ModalContext from '../../store/modalContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ModalStyles.module.css';

const Modal = ({ open }) => {
  const handlLifeCycle = () => {
    // open ? animate.open() : animate.close();
  };

  const outer = {
    hidden: { opacity: 0, transition: { delay: 0.3 } },
    visible: { opacity: 1 }
  };

  const inner = {
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
      {({ closeModal, message }) => (
        <motion.div onClick={closeModal}>
          <AnimatePresence>
            {open ? (
              <motion.div
                className={styles.outer}
                variants={outer}
                initial='hidden'
                animate='visible'
                exit='hidden'
              >
                <motion.section className={styles.inner} variants={inner}>
                  <h1>{message.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: message.html }}></div>
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
