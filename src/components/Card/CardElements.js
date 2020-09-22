import React from 'react';
import styles from './CardStyles.module.css';
import { ThemeContext } from '../Theme';

import Logo from '../../assets/logo.svg';
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
  return (
    <section className={styles.body} {...props}>
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
