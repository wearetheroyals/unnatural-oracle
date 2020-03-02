import React from 'react';
import { ModalProvider } from './src/store/modalContext';

export const wrapPageElement = ({ element }) => {
  return <ModalProvider>{element}</ModalProvider>;
};
