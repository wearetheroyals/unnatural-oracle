import React from 'react';
import Layout from './src/components/Layout';
import { ModalProvider } from './src/store/modalContext';

export const wrapPageElement = ({ element }) => {
  return (
    <ModalProvider>
      <Layout>{element}</Layout>
    </ModalProvider>
  );
};
