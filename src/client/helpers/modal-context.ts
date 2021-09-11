import { createContext } from 'react';

type modalType = {
  show: boolean
  element: undefined | (() => JSX.Element);
}

export default createContext<[modalType, React.Dispatch<React.SetStateAction<modalType>>]>(undefined);
export { modalType };
