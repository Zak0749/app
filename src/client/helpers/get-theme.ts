import { Theme } from '../..';

function getTheme(theme: 'light' | 'dark'): Theme {
  if (theme === 'dark') {
    return {
      mainBg: 'black',
      bg: 'bg-dark',
      text: 'text-light',
      main: 'dark',
      opp: 'light',
    };
  }

  return {
    mainBg: 'white',
    bg: 'bg-light',
    text: 'text-dark',
    main: 'light',
    opp: 'dark',
  };
}

export default getTheme;
