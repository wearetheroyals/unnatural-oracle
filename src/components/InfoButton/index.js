import React, { useState, useContext } from 'react';
import styles from './InfoButtonStyles.module.css';
import InfoIcon from '../../assets/icon_info.svg';
import ModalContext from '../../store/modalContext';
import useContentQuery from '../../hooks/useContentQuery_About';

const InfoButton = (props) => {
  const [flipped, setFlipped] = useState(false);
  const className = `${styles.info} ${flipped ? styles.flipped : ''} ${
    props.className ? props.className : ''
  }`;
  const { openModal, setMessage } = useContext(ModalContext);
  const {
    frontmatter: { title },
    html,
  } = useContentQuery().data;

  return (
    <InfoIcon
      className={className}
      onMouseEnter={() => {
        setFlipped(true);
      }}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => {
        setMessage({ title, html });
        openModal();
      }}
    />
  );
};

export default InfoButton;
