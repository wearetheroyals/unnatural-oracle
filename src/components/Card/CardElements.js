import React, { useState } from 'react';
import styles from './CardStyles.module.css';
import { ThemeContext } from '../Theme';

import Logo from '../../assets/logo.svg';
import NextIcon from '../../assets/icon_next.svg';
import InfoButton from '../InfoButton';

export const Card = (props) => (
  <ThemeContext.Consumer>
    {(value) => (
      <div {...props} className={`${value} ${styles.card}`}>
        {props.children}
      </div>
    )}
  </ThemeContext.Consumer>
);

export const CardBody = (props) => {
  const [classes, setClasses] = useState([styles.body]);
  return (
    <section
      {...props}
      className={classes.join(' ')}
      onMouseEnter={() => setClasses([styles.body, styles.hover])}
      onMouseLeave={() => setClasses([styles.body])}
    >
      <NextIcon className={styles.nextCard} />
      <p>{props.text}</p>
    </section>
  );
};

export const CardFooter = () => (
  <footer className={styles.footer}>
    <InfoButton className={styles.infoButton} />
    <Logo className={styles.logo} />
  </footer>
);

export const CardHeader = (props) => {
  return (
    <header {...props} className={styles.header}>
      {props.children}
    </header>
  );
};
