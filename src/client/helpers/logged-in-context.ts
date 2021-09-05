import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { RefetchOptions } from 'axios-hooks';
import { createContext } from 'react';

type loggedIn = {
  // eslint-disable-next-line no-unused-vars
  refresh: (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<any>
  status : boolean
}

export default createContext<loggedIn>({ refresh: null, status: false });
