import React from 'react';
import htmlHead from './htmlHead';

import './reset.css';
import './styles.css';

export default ({ children }) => (
  <>
    {htmlHead}
    <main>{children}</main>
  </>
);
