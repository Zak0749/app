import { createContext } from 'react';

export default createContext<loggedIn>({ loggedIn: null, setLoggedIn: null });
