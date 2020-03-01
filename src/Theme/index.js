import React from 'react';
import styles from './Palettes.module.css';

const palettes = Object.values(styles).map(value => value);

export const getPaletteAtIndex = index => {
  const max = palettes.length - 1;
  index = index > max ? 0 : index < 0 ? max : index;
  return { className: palettes[index], index };
};

export const ThemeContext = React.createContext(null);
