import { createContext } from 'react';
import { Theme } from '../..';

export default createContext<Theme>({
  mainBg: 'black',
  bg: 'bg-dark',
  text: 'text-light',
  main: 'dark',
  opp: 'light',
});
