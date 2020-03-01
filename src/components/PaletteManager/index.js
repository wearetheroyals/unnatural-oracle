import React, { useState } from 'react';
import styles from './Palettes.module.css';

const palettes = Object.values(styles).map(value => value);
const increment = i => (i = i + 1 >= palettes.length ? 0 : i + 1);
const decrement = i => (i = i - 1 < 0 ? palettes.length - 1 : i - 1);

export const PaletteManager = props => {
  const [currentTheme, setCurrentTheme] = useState(0);

  // let currentPaletteIndex = 0;

  // console.log('>>>>> PalMan <<<<<');
  // console.log(props.children);

  //   Object.keys(props.children).map(key => {
  // const child = props.children[key];
  //   props.children.map(child => {
  // const child = props.children[key];
  //     console.log('------');
  //     console.log(child);
  //     console.log('======');
  //   });

  const next = () => (currentPaletteIndex = increment(currentPaletteIndex));
  const back = () => (currentPaletteIndex = decrement(currentPaletteIndex));

  return <>{props.children}</>;
};

export default PaletteManager;
