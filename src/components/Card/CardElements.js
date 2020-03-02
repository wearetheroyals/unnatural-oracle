import React, { useState, useEffect } from 'react';
import styles from './CardStyles.module.css';
import { ThemeContext } from '../Theme';

export const Card = props => (
  <ThemeContext.Consumer>
    {value => (
      <div {...props} className={`${value} ${styles.card}`}>
        {props.children}
      </div>
    )}
  </ThemeContext.Consumer>
);

export const CardBody = props => {
  return (
    <section className={styles.body}>
      <p>{props.text}</p>
    </section>
  );
};

export const CardFooter = props => (
  <footer className={styles.footer}>{props.children}</footer>
);

export const CardHeader = props => {
  return <header className={styles.header}>{props.children}</header>;
};
