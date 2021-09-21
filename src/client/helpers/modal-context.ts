import { createContext, FC } from 'react';

type modalType = {
  show: boolean
  element: undefined | FC;
}

export default createContext<[modalType, React.Dispatch<React.SetStateAction<modalType>>]>(undefined);
export { modalType };
