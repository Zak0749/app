import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const config = axios.create({
  baseURL: 'https://nitetop.local/api',
  withCredentials: true,
});

const useAxios = makeUseAxios({
  axios: config,
});

export { config as axios, useAxios };
