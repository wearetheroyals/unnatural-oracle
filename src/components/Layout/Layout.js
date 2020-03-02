import React, { useState } from 'react';

import htmlHead from './htmlHead';
import Info from '../Info';

import './reset.css';
import './styles.css';

let show = true;

const onInfoClick = e => {
  show = !show;
};

export default ({ children }) => {
  const [infoVisible, setInfoVisible] = useState(true);

  return (
    <>
      {htmlHead}
      <Info onClick={() => setInfoVisible(false)} show={infoVisible} />
      <main>{children}</main>
    </>
  );
};
