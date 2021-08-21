import Axios from 'axios';

const Request = Axios.create({
  baseURL: 'https://nitetop.local/api',
  withCredentials: true,
});

export default Request;
