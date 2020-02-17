import React from 'react';
import { ReactComponent as Pupil } from '../assets/pupil.svg';
import { ReactComponent as Eye } from '../assets/eye.svg';

const OracleEye = () => {
  return (
    <div className='wrapper'>
      <div className='inner'>
        <Eye />
        <Pupil />
      </div>
    </div>
  );
};

export default OracleEye;
