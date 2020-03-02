import React from 'react';

import htmlHead from './htmlHead';
import ModalContext from '../../store/modalContext';
import Modal from '../Modal';

import '../../css/reset.css';
import '../../css/styles.css';

export default ({ children }) => {
  return (
    <>
      {htmlHead}
      <ModalContext.Consumer>
        {({ open }) => <Modal open={open} />}
      </ModalContext.Consumer>
      <main>{children}</main>
    </>
  );
};
