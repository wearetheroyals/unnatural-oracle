import React from 'react';

import htmlHead from './htmlHead';
import ModalContext from '../../store/modalContext';
import Info from '../Info';

import './reset.css';
import './styles.css';

export default ({ children }) => {
  return (
    <>
      {htmlHead}
      <ModalContext.Consumer>
        {({ open }) => <Info open={open} />}
      </ModalContext.Consumer>
      <main>{children}</main>
    </>
  );
};
