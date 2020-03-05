import React from 'react';
import styles from './Palettes.module.css';
import { PaletteManager } from './Palette';

export const paletteManager = new PaletteManager(styles);
export const ThemeContext = React.createContext(null);
