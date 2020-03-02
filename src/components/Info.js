import { motion } from 'framer-motion';
import React from 'react';

const duration = 0.75;

const variants = {
  open: {
    transform: 'rotateX(0deg)',
    opacity: 1,
    top: 0,
    transition: { duration: duration }
  },
  closed: {
    opacity: 0,
    top: '-50%',
    transform: 'rotateX(-90deg)',
    transition: { duration }
  }
};

const Info = props => {
  return (
    <motion.div
      variants={variants}
      animate={props.show ? 'open' : 'closed'}
      className='wtf'
      onClick={props.onClick}
    >
      <section>
        <h3>WTF?</h3>
        <p>
          This is a thing by The Royals. We built it because, yeah. Why not.
        </p>
        <p>
          This is it. This is the answer. It says here that a bolt of lightning
          is gonna strike the clock tower precisely at 10:04 p.m. next Saturday
          night. If we could somehow harness this bolt of lightning, channel it
          into the flux capacitor, it just might work. Next Saturday night,
          we're sending you back to the future. Ah well, sort of. What, well you
          mean like a date? Scram, McFly. Thank god I still got my hair. What on
          Earth is that thing I'm wearing?
        </p>
        <p>
          If you like this, you'll love{' '}
          <a href='https://theroyals.com.au'>our website</a>.
        </p>
      </section>
    </motion.div>
  );
};

export default Info;
