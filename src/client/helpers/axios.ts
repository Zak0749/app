import Axios from 'axios';

const Request = Axios.create({
  baseURL: 'api',
  withCredentials: true,
});

export default Request;
