import React from 'react';
import styles from './CardStyles.module.css';

export const Card = props => {
  return (
    <div {...props} className={styles.card}>
      {props.children}
    </div>
  );
};

export const CardBody = props => {
  return <section className={styles.body}>{props.children}</section>;
};

export const CardFooter = props => {
  return <footer className={styles.footer}>{props.children}</footer>;
};

export const CardHeader = props => {
  return <header className={styles.header}>{props.children}</header>;
};
